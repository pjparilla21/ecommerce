const express = require('express');
const router = express.Router();
const { getNewProducts, getFeaturedProducts } = require('../handlers/product-handler');

// Route to get new products
router.get('/new-products', async (req, res) => {
    try {
        const newProducts = await getNewProducts();
        res.json(newProducts);
    } catch (error) {
        console.error('Error fetching new products:', error);
        res.status(500).json({ error: 'Failed to fetch new products.' });
    }
});

// Route to get featured products
router.get('/featured-products', async (req, res) => {
    try {
        const featuredProducts = await getFeaturedProducts();
        res.json(featuredProducts);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ error: 'Failed to fetch featured products.' });
    }
});

module.exports = router;
