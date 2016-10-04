function Player(coords, color) {
	this.coords = coords
	this.v = {x: 0, y: 0}
	this.color = color
	this.width = 30
	this.height = 30
	this.onGround = false
	this.deployed = false
	this.hp = Player.maxHp
	this.points = 0
	this.dragRatio = 1
}
Player.maxHp = 100
Player.prototype.land = function () {
	this.onGround = true
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
