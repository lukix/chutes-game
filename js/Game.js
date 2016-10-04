function Game(ctx) {
	this.players = []
	this.g = 300
	this.density = 0.00004
	this.ctx = ctx
}
Game.prototype.addPlayer = function (player) {
	this.players.push(player)
}
Game.prototype.init = function () {
	this.addPlayer(new Player({x: 100, y: 50}, 'red'))
	this.addPlayer(new Player({x: 300, y: 50}, 'green'))
	this.addPlayer(new Player({x: 500, y: 50}, 'blue'))
	this.addPlayer(new Player({x: 700, y: 50}, '#f0f'))
	var self = this
}
Game.prototype.setListeners = function (keyCodes) {
	if(keyCodes.length !== this.players.length)
		throw new Error('')
	var self = this
	window.addEventListener('keydown', function (e) {
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
	this.players.forEach(function (player) {
		player.v.y += self.g * dt
		var drag = Math.pow(player.v.y, 2) * self.density
		if(player.deployed)
			drag *= 15
		player.v.y -= drag
		player.coords.y += player.v.y * dt
	})
}
Game.prototype.draw = function () {
	var self = this
	self.ctx.clearRect(0, 0, 800, 600)
	this.players.forEach(function (player) {
		player.draw(self.ctx)
	})
}
