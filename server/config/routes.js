  var items = require('./../model_controllers/items.js');
  
  module.exports = function(app) {
  	var bodyParser = require('body-parser');
  	app.use(bodyParser.json());
    
    app.get('/items/:stat/', function(req, res) {
      items.getOne(req,res);
      }
    );
} 
///mong
/*    app.post('/addcustomer', function(req,res){
    	customers.add(req,res);
    });
    app.post('/removecustomer',function(req,res){
    	customers.remove(req,res);
    }); 
    app.get('/orders', function(req, res) {
      orders.show(req,res);
    });
    app.get('/products', function(req,res){
      products.show(req,res);
    });
    app.post('/addorder',function(req,res){
      orders.add(req,res);
    });
*/
  