/*
* 
* main.js
*/

enchant();

window.onload = function() {
	
	
	gameWidth = 480;
	gameHeight = 800;
	
	// Create Game	
	game = new Game(gameWidth, gameHeight);
	game.scale = 1;
	game.fps = 60;

	// Key bind
	game.keybind(14, 'shift');
	game.keybind(32, 'space');

	// Preload assets
	game.preload(
	
		'img/start.png',
		'img/title_small.png'
		
	);

	// Set scenes and start game
	game.onload = function() {		
						
		// Push menu
		menu = new Menu();
		game.pushScene(menu);
								
		document.addEventListener("mousemove", mouseMove, false);
		document.addEventListener("touchmove", mouseMove, false);
		
	}

	// Start game
	game.start();	
	window.focus();
	window.moveTo(0, 0);
	console.log("Window loaded");
}

function mouseMove(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

