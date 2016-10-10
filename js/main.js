(function () {
	var canvas = document.getElementById('cvs')
	var ctx = canvas.getContext('2d')
	var game = new Game(ctx)
	var playerButtons = document.getElementsByClassName('player-btn')

	Array.prototype.slice.apply(playerButtons).forEach(function(button) {
		button.addEventListener('click', function() {
			document.getElementById('menu').style.display = 'none'
			assignKeys(parseInt(button.value))
		})
	})

	function assignKeys(amount) {
		var keyCodes = []
		var run = true
		game.addPlayers(amount)

		window.addEventListener('keydown', function(e) {
			if(keyCodes.indexOf(e.keyCode) === -1 && keyCodes.length < amount) {
				keyCodes.push(e.keyCode)
				document.getElementById('keyCodes').innerHTML += ' '+String.fromCharCode(e.keyCode)+' |'
			}

			if(keyCodes.length === amount && run) {
				run = false
				console.log(keyCodes)
				game.setListeners(keyCodes)
				game.play()
			}
		})
	}
})()
