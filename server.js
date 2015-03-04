var express = require('express');
var path = require('path');
var app = express();
app.set('views',path.join(__dirname,'client/views'));
app.set('view engine','ejs');
 
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.use(express.static(path.join(__dirname, './client'))); 
app.listen(8000, function() {
  console.log('cool stuff on: 8000');
})