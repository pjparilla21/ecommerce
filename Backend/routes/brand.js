const express = require('express');
const router = express.Router();
const BrandHandler = require('../handlers/brand-handler');

// Create a new product
router.post("", async (req, res) => {
    console.log("Product added successfully");
    const model = req.body;

    try {
        let result = await BrandHandler.addBrand(model);
        res.status(201).send(result); // Respond with created product and status 201
    } catch (err) {
        res.status(400).send({ message: "Error adding product", error: err });
    }
});

// Get all products
router.get("", async (req, res) => {
    try {
        let result = await BrandHandler.getBrands();
        res.status(200).send(result); // Respond with the list of products
    } catch (err) {
        res.status(500).send({ message: "Error retrieving products", error: err });
    }
});

// Get a specific product by id
router.get("/:id", async (req, res) => {
    try {
        let result = await BrandHandler.getBrand(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(result); // Respond with the product
    } catch (err) {
        res.status(500).send({ message: "Error retrieving product", error: err });
    }
});

// Update a product by id
router.put("/:id", async (req, res) => {
    const id = req.params["id"];
    const model = req.body;

    try {
        let result = await BrandHandler.updateBrand(id, model);
        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(result); // Respond with the updated product
    } catch (err) {
        res.status(400).send({ message: "Error updating product", error: err });
    }
});

// Delete a product by id
router.delete("/:id", async (req, res) => {
    const id = req.params["id"];

    try {
        let result = await BrandHandler.deleteBrand(id);
        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully" }); // Respond with success message
    } catch (err) {
        res.status(500).send({ message: "Error deleting product", error: err });
    }
});

module.exports = router;
