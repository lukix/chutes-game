function Game(ctx) {
	this.players = []
	this.g = 150
	this.density = 0.0001
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
		player.v.y -= Math.pow(player.v.y, 2) * self.density
		player.coords.y += player.v.y * dt
	})
}
Game.prototype.draw = function () {
	var self = this
	self.ctx.clearRect(0, 0, 800, 600)
	this.players.forEach(function (player) {
		self.ctx.fillStyle = player.color
		self.ctx.fillRect(player.coords.x, player.coords.y, 50, 50)
	})
}
