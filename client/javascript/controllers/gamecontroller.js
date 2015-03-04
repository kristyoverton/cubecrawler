cubeCrawler.controller('gameController', function($scope, mapFactory, messageFactory) {
	$scope.map = [];
	$scope.name = '';
	$scope.gameNotStarted = true;
	$scope.messages = [];
	$scope.enemies = [];
	$scope.items = [];

	function Character (name,x,y,mapCharacter,sanity,level,strength) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.mapCharacter = mapCharacter;
		this.sanity = sanity;
		this.level = level;

		this.nextLevel = function() {
			$scope.enemies = add_enemies();
			mapFactory.initMap($scope.enemies,function (data){
		        $scope.map = data;
		        messageFactory.welcome(function (msg){
					for (item in msg) {
			          $scope.messages.push(msg[item]);
			        }
			    });
		        messageFactory.enemyWarning($scope.enemies, function(){
	              messageFactory.getMessages(function(data){
	                $scope.messages = data;  
		    	  });
		    	});
		    });
		    this.x=5;
		    this.y=5;
		    this.level++;
		}
		//check sanity function required for both player and enemy.  Should be put into function for creating character object
		this.checkSanity=function(){
			if(this.sanity<=0&&this.type=='player'){
				document.getElementById('map').style.display = 'none';
				document.getElementById('inventory').style.display = 'none';
				document.getElementById('stats').style.display = 'none';
				document.getElementById('gameover_sanity').style.display = 'block';
				return false;
			}
			if(this.type=='enemy'){
				if(this.sanity<=0) {
					var index=$scope.enemies.indexOf(this);
					messageFactory.addMessage(this.name+" has been vanquished!", function(){
						messageFactory.getMessages(function(data){
							$scope.messages = data;
							$scope.$digest();
						});
					});
					$scope.player.performance+=this.level;
	  				$scope.enemies.splice(index,1);
					mapFactory.update($scope.map,this.x,this.y,'.', this.x,this.y,'.', function(){
							mapFactory.getMap(function(data){
							$scope.map = data.map;
							$scope.$digest();
						});
					});
  					return false;
  				} else {
  					return true;
  				}
			}
		}


		this.fight=function(enemy){
			if(this.type=="player"){
				messageFactory.addMessage(this.name+" attacks "+enemy.name+"!", function(){
					messageFactory.getMessages(function(data){
						$scope.messages = data;
						$scope.$digest();
					});
				});
				enemy.sanity=enemy.sanity-this.strength;
				this.sanity=this.sanity-enemy.strength;
				enemy.checkSanity();
				this.checkSanity();
			}
		}

		this.move = function(dir) {
			//if left arrow onkeydown
			if(dir == 'left') {
				if ($scope.map[this.y][this.y][this.x-1] ==".") {
					//if movement is valid, change the map characters for both squares and update the character coordinate.
					mapFactory.update($scope.map,(this.x-1),this.y,'.', this.x,this.y,this.mapCharacter, function(){
						mapFactory.getMap(function(data){
							$scope.map = data.map;
							$scope.$digest();
						});
					});
					this.x = this.x-1;
				} else if ($scope.map[this.y][this.y][this.x-1] =="A" ||
						$scope.map[this.y][this.y][this.x-1] == "B" || 
						$scope.map[this.y][this.y][this.x-1] =="C") {
					if(this.type=='player'){
						for(enemy in $scope.enemies){
							if ($scope.enemies[enemy].x == this.x-1  && $scope.enemies[enemy].y == this.y) {
								var thisenemy = $scope.enemies[enemy];
								this.fight(thisenemy);
								break;
							}
						}
					}
					
				} 
				else if ($scope.map[this.y][this.y][this.x-1] =="|"){
					this.nextLevel();
				}

				else if(this.type=='player') {
					console.log('You are banging your head against a wall.')
				}
			} //left
		//if right arrow onkeydown 39
		if(dir == 'right') {
			if($scope.map[this.y][this.y][this.x+1] ==".") {
				mapFactory.update($scope.map,(this.x+1),this.y,'.', this.x,this.y,this.mapCharacter, function(){
						mapFactory.getMap(function(data){
							$scope.map = data.map;
							$scope.$digest();
						});
					});
				this.x = this.x+1;
			} else if ($scope.map[this.y][this.y][this.x+1] =="A" || 
						$scope.map[this.y][this.y][this.x+1] =="B" || 
						$scope.map[this.y][this.y][this.x+1] =="C") {
				if(this.type=="player"){
					for(enemy in $scope.enemies){
						if ($scope.enemies[enemy].x == this.x+1  && $scope.enemies[enemy].y == this.y) {
							var thisenemy = $scope.enemies[enemy];
							this.fight(thisenemy);
							break;
						}
					}
				}
			//	$scope.player.fight(thisenemy);
			}  else if(this.type=='player') {
				console.log('You are banging your head against a wall.')
			}
		}
		//if up arrow onkeydown 40	
		if(dir == 'up') {
			if($scope.map[this.y-1][this.y-1][this.x] ==".") {
				mapFactory.update($scope.map,this.x,(this.y-1),'.', this.x,this.y,this.mapCharacter, function(){
						mapFactory.getMap(function(data){
							$scope.map = data.map;
							$scope.$digest();
						});
					});
				this.y = this.y-1;
			} else if ($scope.map[this.y-1][this.y-1][this.x] =="A" || "B" || "C") {
				if(this.type=="player"){
					for(enemy in $scope.enemies){
						if ($scope.enemies[enemy].x == this.x  && $scope.enemies[enemy].y == this.y-1) {
							var thisenemy = $scope.enemies[enemy];
							this.fight(thisenemy);
							break;
						}
					}
				}
			//	$scope.player.fight(thisenemy);
			} else if(this.type=='player') {
			console.log('You are banging your head against a wall.')
			}
		}
		//if down arrow onkeydown 38
		if(dir == 'down') {
			if($scope.map[this.y+1][this.y+1][this.x] ==".") {
				mapFactory.update($scope.map,this.x,(this.y+1),'.', this.x,this.y,this.mapCharacter, function(){
					mapFactory.getMap(function(data){
						$scope.map = data.map;
						$scope.$digest();
					});
				});	
			this.y = this.y+1;
			} else if ($scope.map[this.y+1][this.y+1][this.x] =="A" || "B" || "C") {
				if(this.type=="player"){
					for(enemy in $scope.enemies){
						if ($scope.enemies[enemy].x == this.x  && $scope.enemies[enemy].y == this.y+1) {
							var thisenemy = $scope.enemies[enemy];
							this.fight(thisenemy);
							break;
						}
					}
				}
			//	$scope.player.fight(thisenemy);
			} else if(this.type=='player') {
				console.log('You are banging your head against a wall.')
			}
		}
	} //move
}

//The enemy got on your last nerve. You quit!
	function Player (name,x,y,mapCharacter,sanity,boredom,level,strength) {
		this.base = Character;
		this.base(name,x,y,mapCharacter,sanity);
		this.type = "player";
		this.boredom = boredom; //hunger
		this.sanity = sanity; //hp
		this.level = 1; //character level
		this.performance = 0; //xp
		this.strength = strength;

		this.checkBoredom=function(){
			if(this.boredom>100){
				document.getElementById('map').style.display = 'none';
				document.getElementById('inventory').style.display = 'none';
				document.getElementById('stats').style.display = 'none';
				document.getElementById('gameover_boredom').style.display = 'block';
			}
		}

	}
	Player.prototype = new Character;

	function Enemy (name,x,y,mapCharacter,sanity,level,strength) {
		this.base = Character;
		this.base(name,x,y,mapCharacter,sanity,level,strength);
		this.type = "enemy";
		this.strength = strength;
	}
	Enemy.prototype = new Character;



	var time_passes=function(){
		$scope.player.boredom++;
		$scope.player.checkBoredom();
		for (enemy in $scope.enemies){
			//AI is currently set to have the enemy move directly towards the player, with no concept of shortest path
			//Probably not the best idea with a cubicle design, since enemy will often get stuck in a cubicle
			//Could check movement validity and repeat as needed to force enemy to move every time
			xdist=$scope.enemies[enemy].x-$scope.player.x;
			ydist=$scope.enemies[enemy].y-$scope.player.y;
			//if the enemy is within 1 square of the player, fight instead of having the enemy move
			//I think this function should be here instead of the player movement to allow the possibility of fighting multiple enemies at same time
			if((-1<=xdist&&xdist<=1)&&(-1<=ydist&&ydist<=1)){
			//	$scope.player.fight(enemy);
			}
			else{
				if(xdist>0){
					if(ydist>xdist){
						direction='up';
					}
					else{
						direction='left';
					}
				}
				else {
					if(ydist>xdist){
						direction='right';
					}
					else{
						direction='down';
					}
				}
				//move function needs to take into account the map character representing each enemy.
				//map character is currently an attribute of the enemy object
				$scope.enemies[enemy].move(direction);
			}
		}//enemy movement
	//could add code to redraw map here if necessary
	//likely better to redraw map within the character move function
	}//time_passes

	var add_enemies=function(level){
		var enemies=[];
		//generate 3 enemies at the start of each floor
		//new character should initialize the type of the character to be the parameter passed in
		var enemy1=new Enemy('Bob from Accounting',10,10,'A',3,1,4);
		var enemy2=new Enemy('Cheryl the Receptionist',15,15,'B',3,1,4);
		var enemy3=new Enemy('Nameless Intern',18,18,'C',3,1,4);
			enemies.push(enemy1);
			enemies.push(enemy2);
			enemies.push(enemy3);
		//enemy stats can be set based on level later on, currently hardcoded.
		//represeted by A,B,C on map to show different enemy type
		return enemies;
	}
	$scope.restart = function(){
		console.log('trying to restart');
		window.location.reload();
	}

	$scope.doGame = function(name) {
		var alive = true;
		$scope.gameNotStarted = false;
		$scope.player = new Player(name,5,5,'@',10,0,1,10);
		//name,x,y,mapCharacter,sanity,boredom,level,strength
		$scope.enemies = add_enemies();
		
		mapFactory.getItem('sanity',function(item){
				console.log($scope.map);
				mapFactory.update($scope.map,item.x,item.y,item.mapCharacter, item.x,item.y,item.mapCharacter, function(){
					mapFactory.getMap(function(data){
						$scope.map = data.map;
						$scope.items = data.items;
					});
				});
			});

		mapFactory.initMap($scope.enemies,function (data){
	        $scope.map = data.map;
	        messageFactory.welcome(function (msg){
				for (item in msg) {
		          $scope.messages.push(msg[item]);
		        }
		    });

	    messageFactory.enemyWarning($scope.enemies, function(){
              messageFactory.getMessages(function(data){
                $scope.messages = data;  
	    	  });
	    	});
	    });

		document.onkeydown = function(e){
			var validkeys = [37,38,39,40];

			if(e.keyCode == 37){
				$scope.player.move('left');
			} else if(e.keyCode == 40){
				$scope.player.move('down');
			} else if(e.keyCode == 39){
				$scope.player.move('right');
			} else if(e.keyCode == 38){
				$scope.player.move('up');
			}
			if (validkeys.indexOf(e.keyCode) != -1) {
				time_passes();	
			};
		} //onkeydown

	} //doGame

}); //gameController



