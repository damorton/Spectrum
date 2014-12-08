enchant();

var ObjDot = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, color, code){
        Sprite.call(this, gameWidth / 24, gameWidth / 24);
		console.log("Objective dot created");
		
		this.code = code;
		//this.color = color;
		this.backgroundColor = color;
						
		this.x = x;
		this.y = y;
						
		this.addEventListener(Event.ENTER_FRAME, this.update);		
    },	
	
    update: function(evt) {	
		
	},
	
	destroy: function(){
		console.log("Objective dot destroyed");				
		sceneGame.removeChild(this);
		delete this;
	}
	
	
});