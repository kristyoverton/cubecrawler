cubeCrawler.factory('messageFactory', function (){
      var factory = {};
      var messages = [];

      factory.welcome = function(callback) {
      	messages.push("Welcome, valued employee! The time is 8:03. Remember, The Company values punctuality.");
      	messages.push("The front door locks behind you. Huh, weird.");
      	callback(messages);
      }

      factory.getMessages = function(callback) {
      	callback(messages);
      }

      factory.enemyWarning = function(enemies,callback) {
      		for(enemy in enemies) {
      			messages.push("Uh oh, here comes "+enemies[enemy].name+"!");
      		}
      		callback(messages);
      }

      factory.addMessage = function(newmsg,callback) {
            messages.push(newmsg);
            callback(messages);
      }

      return factory;
    });
		