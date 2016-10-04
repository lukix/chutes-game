function Player(coords, color) {
	this.coords = coords
	this.v = {x: 0, y: 0}
	this.color = color
	this.deployed = false
	this.alive = true
}
Player.prototype.kill = function () {
	this.alive = false
}
Player.prototype.isAlive = function () {
	return this.alive
}
Player.prototype.deploy = function () {
	this.deployed = true
	this.color = 'white'
}
Player.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color
	ctx.fillRect(this.coords.x, this.coords.y, 30, 30)
}