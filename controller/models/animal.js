const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    name:String,
    species:String,
    favFoods:[String],
    birthYear:Date,
    photo:String,
})

const Animal = mongoose.model('Animal',animalSchema);

module.exports = Animal;