(function () {
	var canvas = document.getElementById('cvs')
	var ctx = canvas.getContext('2d')
	var game = new Game(ctx)
	game.init()
	game.setListeners([81, 67, 77, 80])	//q, v, m, p
	game.play()
})()
