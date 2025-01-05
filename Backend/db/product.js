const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String, // Fixed typo here
    description: String,
    price: Number, // Use lowercase `price` for consistency
    discount: Number,
    images: [String],
    categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    brandId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'brands' }],
    isFeatured: Boolean,
    isNew: Boolean,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
