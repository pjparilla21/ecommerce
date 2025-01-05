const Brand = require('../db/brand');

// Add a new brand
async function addBrand(model) {
    try {
        let brand = new Brand({
            name: model.name,
        });
  brand = await brand.save();
        return brand.toObject(); // Converts Mongoose document to plain JS object
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
}

// Get all brands
async function getBrands() {
    try {
        let brands = await Brand.find().lean(); // Use .lean() for plain JS objects
        return brands;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
}

// Get a brand by ID
async function getBrand(id) {
    try {
        let brand = await Brand.findById(id).lean(); // Use .lean() for plain JS objects
        if (!brand) {
            throw new Error(`Brand with ID: ${id} not found`);
        }
        return brand;
    } catch (error) {
        console.error(`Error fetching brand with ID: ${id}`, error);
        throw error;
    }
}

// Update a brand
async function updateBrand(id, model) {
    try {
        let updatedBrand = await Brand.findByIdAndUpdate(
            id, 
            model, 
            { new: true, runValidators: true } // Return the updated document and run schema validation
        ).lean(); 
        if (!updatedBrand) {
            throw new Error(`Brand with ID: ${id} not found for update`);
        }
        return updatedBrand;
    } catch (error) {
        console.error(`Error updating brand with ID: ${id}`, error);
        throw error;
    }
}

// Delete a brand
async function deleteBrand(id) {
    try {
        let deletedBrand = await Brand.findByIdAndDelete(id).lean();
        if (!deletedBrand) {
            throw new Error(`Brand with ID: ${id} not found for deletion`);
        }
        return deletedBrand;
    } catch (error) {
        console.error(`Error deleting brand with ID: ${id}`, error);
        throw error;
    }
}

module.exports = {
    addBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
};
