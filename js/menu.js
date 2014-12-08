enchant();

var Menu = enchant.Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        game = Game.instance;
		//console.log("Menu screen created");
		this.backgroundColor = '#FF00FF';
		
		// Sound effect Select
		selectSound = enchant.DOMSound.load('sounds/effect_click.wav');
		selectSound.volume = .1;
		//console.log("Sound effect select volume " + selectSound.volume);
		
		title = new Sprite(240, 100);
		title.backgroundColor = '#000000';
		title.image = game.assets['img/title_small.png'];
		title.x = gameWidth / 2 - (title.width / 2);
		title.y = gameHeight / 8 * 1;		
		this.addChild(title);		
				
		startButton = new Sprite(240, 100);
		startButton.backgroundColor = '#000000';
		startButton.image = game.assets['img/start.png'];
		startButton.x = gameWidth / 2 - (startButton.width / 2);
		startButton.y = gameHeight / 8 * 6;	
		startButton.addEventListener(Event.TOUCH_END, function(){
			selectSound.clone().play();
			sceneGame = new SceneGame();			
			game.pushScene(sceneGame);
		});
		this.addChild(startButton);
		
	
		
		// Background music
		menuBackgroundMusic = enchant.DOMSound.load('sounds/background_music_02.mp3');
		menuBackgroundMusic.volume = .2;
		//console.log("Sound effect select volume " + menuBackgroundMusic.volume);
		//menuBackgroundMusic.play();
				
		this.addEventListener(Event.ENTER_FRAME, this.update);
	},
	
	
	update: function(e){
	
		if (menuBackgroundMusic.currentTime >= menuBackgroundMusic.duration) {
			menuBackgroundMusic.play();
			//console.log("Song repeating...");
		}
		
	}

});