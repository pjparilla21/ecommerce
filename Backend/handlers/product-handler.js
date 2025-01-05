const Product = require("../db/product"); // Correct import
const mongoose = require("mongoose");

// Add a new product
async function addProduct(model) {
    try {
        let product = new Product({ ...model });
        product = await product.save();
        return product.toObject(); // Converts Mongoose document to plain JS object
    } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Failed to add product. Please try again later.");
    }
}

// Update an existing product
async function updateProduct(id, model) {
    try {
        await Product.findByIdAndUpdate(id, model, { new: true }); // Return updated product
    } catch (error) {
        console.error(`Error updating product with ID: ${id}`, error);
        throw new Error(`Failed to update product with ID: ${id}`);
    }
}

// Get a single product by ID
async function getProduct(id) {
    try {
        const product = await Product.findById(id).lean(); // Use .lean() for plain JS objects
        if (!product) {
            throw new Error(`Product with ID: ${id} not found`);
        }
        return product;
    } catch (error) {
        console.error(`Error fetching product with ID: ${id}`, error);
        throw new Error(`Failed to fetch product with ID: ${id}`);
    }
}

// Get all products
async function getAllProducts() {
    try {
        return await Product.find({}).lean(); // Return plain JS objects
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw new Error("Failed to fetch products. Please try again later.");
    }
}

// Delete a product by ID
async function deleteProduct(id) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id).lean();
        if (!deletedProduct) {
            throw new Error(`Product with ID: ${id} not found for deletion`);
        }
        return deletedProduct;
    } catch (error) {
        console.error(`Error deleting product with ID: ${id}`, error);
        throw new Error(`Failed to delete product with ID: ${id}`);
    }
}

// Get new products
async function getNewProducts() {
    try {
        return await Product.find({ isNew: true }).lean();
    } catch (error) {
        console.error("Error fetching new products:", error);
        throw new Error("Failed to fetch new products. Please try again later.");
    }
}

// Get featured products
async function getFeaturedProducts() {
    try {
        return await Product.find({ isFeatured: true }).lean();
    } catch (error) {
        console.error("Error fetching featured products:", error);
        throw new Error("Failed to fetch featured products. Please try again later.");
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getAllProducts,
    getNewProducts,
    getFeaturedProducts,
};
