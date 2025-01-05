const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   productsId: Array(String),
});
   
 const wishlist = mongoose.model('wishlist', wishlistSchema);
 module.exports = wishlist;   