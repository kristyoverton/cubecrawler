var mongoose = require('mongoose');
// create our friendSchema
var ItemSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  effect: Object,
  mapCharacter: String,
  useMessage: String
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Item', ItemSchema);