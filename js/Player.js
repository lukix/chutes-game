function Player(coords, color) {
	this.coords = coords
	this.v = {x: 0, y: 0}
	this.color = color
	this.deployed = false
	this.width = 30
	this.height = 30
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
