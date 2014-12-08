enchant();

var Dot = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, color, code){
        Sprite.call(this, gameWidth / 12, gameWidth / 12);
		//console.log("Dot created");
		
		this.code = code;
		//this.color = color;
		this.backgroundColor = color;
		this.selected = false;
		
		//console.log("code : " + this.code + " color: " + this.color + " background: " + this.backgroundColor);
		
		this.isDestroyed = false;
		this.objDot = false;
		
		this.x = x;
		this.y = y;
		
		
		this.addEventListener(Event.TOUCH_START, this.touchStart);
		this.addEventListener(Event.TOUCH_END, this.touchEnd);
		this.addEventListener(Event.ENTER_FRAME, this.update);
		
    },
	
	touchStart: function(evt){
		this.selected = true;
		
		// objective dot removed
		/*
		if(this.code == objDot.code){
			this.destroy();			
		}
		*/
		this.destroy();
		//this.lightsOff();
		selectSound.clone().play();
		//console.log("Dot clicked");
		//sceneGame.checkDots();		
	},
	
	touchEnd: function(evt){
		
	},
	
    update: function(evt) {	
		//if(score >= 3) this.lightsOn();
	},
	
	lightsOff: function(){
		//console.log("Dot lights off");
		this.selected = false;
		dotsCount--;
		score++;
		sceneGame.removeChild(this);
	},
	
	lightsOn: function(){
		//console.log("Dot lights on");
		dotsCount++;
		score--;
		sceneGame.addChild(this);
	},
	
	destroy: function(){
		console.log("Dot destroyed");
		this.objDot = false;
		this.isDestroyed = true;
		//objDotsCount--;		
		dotsCount--;
		score++;
		sceneGame.removeChild(this);
		delete this;		
	}

});