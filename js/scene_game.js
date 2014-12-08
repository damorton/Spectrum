/*
* sceneGame.js
*/

enchant();



var SceneGame = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        game = Game.instance;
		console.log("Game screen created");
		
		// Scene background color
		this.backgroundColor = '#FFFFFF';
		
		// Touch/Click co-ordinates
		touchX = 0;
		touchY = 0;
		
		// Set time limit
		timeLimit = 30; // seconds
		
		// Number of objective dots left
		//objDotsCount = 0;
				
		// Time display
		timeLabel = new Label("Time ");
		timeLabel.font = '10px Segoe UI Light';			
		timeLabel.x = gameWidth / 4;
		timeLabel.y = 20;		
		//this.addChild(timeLabel);
		
		timeDigit = new Label();
		timeDigit.font = '20px Segoe UI Light';
		timeDigit.text = timeLimit + " secs";
		timeDigit.x = timeLabel.x + 30;
		timeDigit.y = 10;		
		//this.addChild(timeDigit);
		
		// Score display
		scoreLabel = new Label("Score ");
		scoreLabel.font = '10px Segoe UI Light';		
		scoreLabel.x = gameWidth / 4 * 2.5;
		scoreLabel.y = 20;		
		this.addChild(scoreLabel);
		
		scoreDigit = new Label();
		scoreDigit.font = '20px Segoe UI Light';
		scoreDigit.x = scoreLabel.x + 30;
		scoreDigit.y = 10;		
		this.addChild(scoreDigit);
		
		/*
		// Objective Dot
		objectiveLabel = new Label("x " + objDotsCount);
		objectiveLabel.font = '10px Segoe UI Light';			
		objectiveLabel.x = gameWidth / 4;
		objectiveLabel.y = 20;		
		this.addChild(objectiveLabel);
			*/	
		// Player score	
		score = 0;
		highScore = 0;	

		//objDot = new ObjDot(objectiveLabel.x - 25, 15);		
		
		// Background music
		backgroundMusic = enchant.DOMSound.load('sounds/background_music_02.mp3');
		backgroundMusic.volume = .2;
		console.log("Sound effect select volume " + backgroundMusic.volume);
		backgroundMusic.play();
				
		/*
		// Game pad
		var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        this.addChild(pad);
		*/

		// Dot color
		color = '#00FF00';
				
		this.startGame();	

        this.addEventListener(Event.ENTER_FRAME,this.update);
        this.addEventListener(Event.TOUCH_START,this.touchStart);
        this.addEventListener(Event.TOUCH_MOVE,this.touchMove);
        this.addEventListener(Event.TOUCH_END,this.touchEnd);
				
    },
	
	restart: function(){		
	},
	
	startGame: function(){		
		console.log("Game created");
		score = 0;
		
		dotsArray = new Array();
		arrayIndex = 0;
		
		originalDotsCount = 0;
		dotsCount = 0;
		dotCode = 0;
		
		index = 0;		
				
		numDotsSelected = 0;
		allDotsRemoved = false;		
		
		for(var i = 1; i < 15; i++){
			for(var j = 1; j < 9; j++){
				colorNumber = Math.floor((Math.random()*12)+1);
				if(colorNumber == 1){
					dotCode = colorNumber;
					color = '#ff0000';
				}
				if(colorNumber == 2){
					dotCode = colorNumber;
					color = '#FF8000';
				}
				if(colorNumber == 3){
					dotCode = colorNumber;
					color = '#FFFF00';
				}
				if(colorNumber == 4){
					dotCode = colorNumber;
					color = '#80FF00';
				}
				if(colorNumber == 5){
					dotCode = colorNumber;
					color = '#00FF00';
				}
				if(colorNumber == 6){
					dotCode = colorNumber;
					color = '#00FF80';
				}
				if(colorNumber == 7){
					dotCode = colorNumber;
					color = '#00FFFF';
				}
				if(colorNumber == 8){
					dotCode = colorNumber;
					color = '#0080FF';
				}
				if(colorNumber == 9){
					dotCode = colorNumber;
					color = '#0000FF';
				}
				if(colorNumber == 10){
					dotCode = colorNumber;
					color = '#7401DF';
				}
				if(colorNumber == 11){
					dotCode = colorNumber;
					color = '#FF00FF';
				}
				if(colorNumber == 12){
					dotCode = colorNumber;
					color = '#FF0040';
				}
				
				// Create a dot 
				dot = new Dot(j * 50, i * 50, color, dotCode);
				
				// Add the dot to an array of dots
				dotsArray[arrayIndex++] = dot;
				
				//arrayIndex++;
				dotsCount++;
				
				this.addChild(dot);				
			}			
		}
		
		originalDotsCount = dotsCount;
		
		// Pick objective Dot color		
		
		
		//this.addChild(this.pickObjDot());
		this.checkDots();
		
	},
	
    update: function(evt){
		
		
		if (backgroundMusic.currentTime >= backgroundMusic.duration) {
			backgroundMusic.play();
			//console.log("Song repeating...");
		}
		
		
		
		if(dotsCount <= 0) {
			//console.log("All dots removed");
			//backgroundMusic.stop();
			delete this;
			game.pushScene(menu);			
		}
		
		
		timeDigit.text = timeLimit + " secs";
		scoreDigit.text = score;
		//objectiveLabel.text = "x " + objDotsCount;

    },
	
	touchStart: function (e) {
		touchX = e.localX;
		touchY = e.localY;
		game.touched = true;
	},

	touchMove: function (e) {
		touchX = e.localX;
		touchY = e.localY;
		game.touched = true;
	},

	touchEnd: function (e) {		
		touchX = e.localX;
		touchY = e.localY;
		game.touched = false;		
	},
	
	checkDots: function(e){
		//console.log("Checking dots array...(" + dotsCount + ")");		
		for(var i = 0; i < dotsCount; i++){
			//console.log("Dot code " + dotsArray[i].code + " Obj dot " +  dotsArray[i].objDot);					
		}
		//console.log("Objective dot code " + objDot.code);
		//console.log("Objective dots left " + objDotsCount);		
	},
	
	pickObjDot: function(e){
		//console.log("Picking objective Dot...");	
		
		// Pick a random index 
		dotIndex = Math.floor((Math.random() * originalDotsCount)+1);
		
		if(!dotsArray[dotIndex].isDestroyed){
			//console.log("Objective dot at " + dotIndex);
			// Create a dot similar to one found at random index
			objDot.backgroundColor = dotsArray[dotIndex].color; 
			objDot.code = dotsArray[dotIndex].code;
			// Setting the dots in the array to object dots status
			//console.log("Setting objective dots...");
			for(var i = 0; i < originalDotsCount; i++){			
				if(dotsArray[i].code == objDot.code && !dotsArray[i].isDestroyed){
					dotsArray[i].objDot = true;
					objDotsCount++;
					//console.log("Dot code " + dotsArray[i].code + " Obj dot " +  dotsArray[i].objDot);		
				}
			}
			//console.log("Objective dots set");	
		}else{
			//console.log("This dot is destroyed");
		}				
		
		
		//this.checkDots();
		return objDot;
	}
});

