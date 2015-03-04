var mongoose = require('mongoose');
var Item = mongoose.model('Item');

module.exports = (function() {
  return {
    getOne: function(req, res) {
      Item.count({'effect.stat':req.params.stat}, function(err,count) {
          if (err)
            console.log(err);
          else {
            var rand = Math.floor(Math.random() * count);
              Item.findOne().where('effect.stat',req.params.stat).skip(rand).exec(function(err,result) {
                res.json(result);    
                })
              ;
          }
        }//function
      ); //count
    }//getOne
  }//return
})();

