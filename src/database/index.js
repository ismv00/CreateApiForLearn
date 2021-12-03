const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ismv00:Igor2502@apinode.yobje.mongodb.net/apiWithNode?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;