var cubeCrawler= angular.module('cubeCrawler', ['ngRoute']);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

/*while (alive) {
	handleInput(input);
	updateMonsterStats();
	updatePlayerStats();
	timePasses();
	map.refresh();
}*/
	//while the player is not dead...
	// LISTEN for player input
	// PROCESS input
	// time passes
	// UPDATE creatures
	// update map 	

	
// on "start" click, INITIALIZE function 
	// draw map incl. items
		//FACTORY: get grid from db, put into scopes
	//create player
		//FACTORY: get stats from db, initialize coordinates to entrance of map, draw @ on the map at coords
	//create enemies
		//FACTORY: get stats from db, place on map, draw ^ on map at coords - do several times
	//display a message with the controls

