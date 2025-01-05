const express = require('express');
const router = express.Router();
const Category = require('../db/category');

// Create a new category
router.post("", async (req, res) => {
    console.log("Category added successfully");
    const model = req.body;

    try {
        let result = await Category.create(model);
        res.status(201).send(result); // Respond with created category and status 201
    } catch (err) {
        res.status(400).send({ message: "Error adding category", error: err });
    }
});

// Get all categories
router.get("", async (req, res) => {
    try {
        let result = await Category.find({});
        res.status(200).send(result); // Respond with the list of categories
    } catch (err) {
        res.status(500).send({ message: "Error retrieving categories", error: err });
    }
});

// Get a specific category by id
router.get("/:id", async (req, res) => {
    try {
        let result = await Category.findById(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send(result); // Respond with the category
    } catch (err) {
        res.status(500).send({ message: "Error retrieving category", error: err });
    }
});

// Update a category by id
router.put("/:id", async (req, res) => {
    const id = req.params["id"];
    const model = req.body;

    try {
        let result = await Category.findByIdAndUpdate(id, model, { new: true }); // Use findByIdAndUpdate to update the category
        if (!result) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send(result); // Respond with the updated category
    } catch (err) {
        res.status(400).send({ message: "Error updating category", error: err });
    }
});

// Delete a category by id
router.delete("/:id", async (req, res) => {
    const id = req.params["id"];

    try {
        let result = await Category.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send({ message: "Category deleted successfully" }); // Respond with success message
    } catch (err) {
        res.status(500).send({ message: "Error deleting category", error: err });
    }
});

module.exports = router;
