(function () {
	var canvas = document.getElementById('cvs')
	var ctx = canvas.getContext('2d')
	var game = new Game(ctx)
	var playerButtons = document.getElementsByClassName('player-btn')

	Array.prototype.slice.apply(playerButtons).forEach(function(button) {
		button.addEventListener('click', function() {
			document.getElementById('menu').style.display = 'none'
			game.addPlayers(button.value)
		})
	})

})()
