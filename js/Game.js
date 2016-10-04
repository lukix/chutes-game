function Game(ctx) {
	this.players = []
	this.g = 300
	this.density = 0.00004
	this.ctx = ctx
	this.groundPosition = 500
}
Game.colors = ['red', 'blue', 'green', 'yellow']
Game.prototype.addPlayers = function (amount) {
	var self = this
	for(var i = 0; i < amount; ++i){
		this.players.push(new Player({
			x: self.ctx.canvas.width / 2 + (i - amount / 2) * self.ctx.canvas.width / amount,
			y: 50
		}, Game.colors[i]))
	}

	self.setListeners([81, 86, 77, 80])	//q, v, m, p
	self.play()
}
Game.prototype.setListeners = function (keyCodes) {
	if(keyCodes.length < this.players.length)
		throw new Error('')
		
	var self = this
	window.addEventListener('keydown', function (e) {
		//console.log(e.keyCode)
		for(var i = 0; i < self.players.length; i++) {
			if(e.keyCode === keyCodes[i]) {
				self.players[i].deploy()
			}
		}
	})
}
Game.prototype.play = function () {
	var self = this
	function run() {
		self.update(1/60)
		self.draw()
		requestAnimationFrame(run)
	}
	run()
}
Game.prototype.update = function (dt) {
	var self = this
	this.players.forEach(function (player, index) {
		if(!player.isAlive())
			return
		player.v.y += self.g * dt
		var drag = Math.pow(player.v.y, 2) * self.density
		if(player.deployed)
			drag *= 15
		player.v.y -= drag
		player.coords.y += player.v.y * dt
		if(player.coords.y > self.groundPosition) {
			console.log('player ' + index + ' landing velocity = ' + player.v.y)
			player.kill()
		}
	})
}
Game.prototype.draw = function () {
	var self = this
	self.ctx.clearRect(0, 0, 800, 600)
	this.players.forEach(function (player) {
		player.draw(self.ctx)
	})
}
