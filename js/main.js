(function () {
	var canvas = document.getElementById('cvs')
	var ctx = canvas.getContext('2d')
	var game = new Game(ctx)
	game.init()
	game.play()
})()
