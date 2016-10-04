function Player(coords, color) {
	this.coords = coords
	this.v = {x: 0, y: 0}
	this.color = color
	this.width = 30
	this.height = 30
	this.alive = true
	this.deployed = false
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
	ctx.fillRect(
		this.coords.x - this.width / 2,
		this.coords.y - this.height / 2,
		this.width,
		this.height
	)
}
