function Player(coords, color) {
	this.coords = coords
	this.v = {x: 0, y: 0}
	this.color = color
	this.deployed = false
}
Player.prototype.deploy = function () {
	this.deployed = true
	this.color = 'white'
}