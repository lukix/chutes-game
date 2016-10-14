function Camera(ctx) {
	this.ctx = ctx
	this.transformValues = {dx: 0, dy: 0, scaleX: 1.0, scaleY: 1.0}
	this.origin = {x: ctx.canvas.width / 2, y: ctx.canvas.height / 2}
}
Camera.prototype.setOrigin = function (x, y) {
	this.origin.x = x
	this.origin.y = y
}
Camera.prototype.moveTo = function (x, y) {
	if(x !== null)
		this.transformValues.dx = x
	if(y !== null)
		this.transformValues.dy = y
	this.refresh()
}
Camera.prototype.setZoom = function (zoom) {
	this.transformValues.scaleX = zoom
	this.transformValues.scaleY = zoom
	this.refresh()
}
Camera.prototype.zoom = function (k) {
	this.transformValues.scaleX *= k
	this.transformValues.scaleY *= k
	this.refresh()
}
Camera.prototype.refresh = function() {
	var self = this
	this.ctx.setTransform(
		this.transformValues.scaleX,
		0,
		0,
		this.transformValues.scaleY,
		(-this.transformValues.dx*this.transformValues.scaleX + self.origin.x),
		(-this.transformValues.dy*this.transformValues.scaleY + self.origin.y)
	)
}