function Game(ctx) {
	this.players = []
	this.points = []
	this.ctx = ctx
	this.groundPosition = 500
}
Game.colors = ['red', 'blue', 'green', 'yellow', 'violet', 'orange']
Game.keyCodes = [65, 83, 68, 70, 71, 72] //a,s,d,f,g,h
Game.g = 300
Game.density = 0.004
Game.maxDragRatio = 15
Game.deploySpeed = 0.5
Game.Vmax2 = Game.g / Game.density * 0.9
Game.Vmin2 = Game.g / Game.density / Game.maxDragRatio
Game.firstRewarded = false
Game.deathPoints = -1
Game.livePoints = 3

Game.prototype.addPlayers = function (amount) {
	var self = this
	for(var i = 0; i < amount; ++i){
		this.players.push(new Player({
			x: (i + 1) * self.ctx.canvas.width / (amount + 1),
			y: 50
		}, Game.colors[i]))
		this.points.push(0)
	}
}
Game.prototype.setListeners = function (keyCodes) {
	if(keyCodes.length < this.players.length)
		throw new Error('Too few key codes')

	var self = this
	window.addEventListener('keyup', function (e) {
		//console.log(e.keyCode)
		var index = keyCodes.indexOf(e.keyCode)
		if(index !== -1) {
			self.players[index].deploy()
		}
	})
}
Game.prototype.play = function () {
	var self = this
	function run() {
		self.update(1/60)
		self.draw()
		window.requestAnimationFrame(run)
	}

	window.requestAnimationFrame(run)
}
Game.prototype.update = function (dt) {
	var self = this
	self.players.forEach(function (player, index) {
		if(!player.onGround){
			player.v.y += Game.g * dt
			var drag = Math.pow(player.v.y, 2) * Game.density

			if(player.deployed) {
				if(player.dragRatio < Game.maxDragRatio) {
					player.dragRatio += dt * Game.maxDragRatio * Game.deploySpeed
				}
				drag *= player.dragRatio
			}
			player.v.y -= drag * dt
			player.coords.y += player.v.y * dt

			self.collisionControl(player, index)
		}
	})
}
Game.prototype.draw = function () {
	var self = this
	self.ctx.clearRect(0, 0, 800, 600)
	self.ctx.fillStyle = "rgb(30, 189, 155)"
	self.ctx.fillRect(0, self.groundPosition, self.ctx.canvas.width, 30)
	self.players.forEach(function (player) {
		player.draw(self.ctx)
	})
}

Game.prototype.collisionControl = function (player, index) {
	if(player.coords.y + player.height / 4 > this.groundPosition) {
		var dmgRatio = Player.maxHp / (Game.Vmax2 - Game.Vmin2)
		var dmg = Math.floor(dmgRatio * (Math.pow(player.v.y, 2) - Game.Vmin2))

		if(dmg > 0) { player.hp -= dmg }

		if(player.hp <= Math.floor(0) && player.alive) {
			player.hp = 0
			player.kill()
			this.points[index] += Game.deathPoints
		}
		else if (!Game.firstRewarded) {
			this.points[index] += Game.livePoints
			Game.firstRewarded = true
		}

		console.log('player ' + index + ' velocity: ' + player.v.y +' hp: ' + player.hp)
		console.log('player ' + index + ' points = ' + this.points[index])
		player.land()
	}
}
