const Category = require('../db/category');

async function addCategory(model) {
    try {
        let category = new Category({
            name: model.name
        });
        category = await category.save();
        return category.toObject(); // Optional: If you prefer this approach, otherwise you can use .lean()
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}

async function updateCategory(id, model) {
    try {
        await Category.findByIdAndUpdate({_id: id}, model);    
        return;
    } catch (error) {
        console.error(`Error updating category with ID: ${id}`, error);
        throw error;
    }
}

async function getCategory() {
    try {
        let categories = await Category.find().lean(); // .lean() for better performance
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

async function getCategoryById(id) {
    try {
        let category = await Category.findById(id).lean(); // .lean() for better performance
        return category;
    } catch (error) {
        console.error(`Error fetching category with ID: ${id}`, error);
        throw error;
    }
}

async function deleteCategory(id) {
    try {
        await Category.findByIdAndDelete({_id: id});
        return;
    } catch (error) {
        console.error(`Error deleting category with ID: ${id}`, error);
        throw error;
    }
}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryById
}
