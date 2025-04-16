const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const categories = require('../models/Category_m');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './Category';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadCategory = multer({ storage: storage });

router.post('/', uploadCategory.single('Thumbnail_img'), async (req, resp) => {
    try {
        const { Category ,CategoryDescription } = req.body;

        // Create the file path (relative to your public folder)
        const photoPath = req.file ? `Category/${req.file.filename}` : null;

        // Create a new item instance
        const newcategories = new categories({
            Category,
            CategoryDescription,
            Thumbnail_img: photoPath // Store the file path in the database
        });

        // Save the new item to MongoDB
        await newcategories.save();
        resp.status(201).json({ message: 'categories created successfully',categories: newcategories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, resp) => {
    try {
        const data = await categories.find(); // Fetch all items from the database

        console.log('Data Fetched'.rainbow);

        const host = req.protocol + '://' + req.get('host'); // Dynamically get the host

        // Map the data to ensure the photo URL is returned with the correct full path
        const result = data.map(categories => {
            if (categories.Thumbnail_img) {
                categories.Thumbnail_img = `Category/${categories.Thumbnail_img.split('/').pop()}`; // Construct the full URL
            }
            return categories;
        });

        resp.status(200).json(result);
    } catch (err) {
        console.error(err);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, resp) => {
    try {
        const categoriesId = req.params.id;
        const updateData = req.body;

        const response = await categories.findByIdAndUpdate(categoriesId, updateData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return resp.status(404).json({ error: 'Items not found' });
        }
        console.log('data updated'.blue);
        resp.status(200).json(response);

    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
})

//Delete Data:
router.delete('/:id', async (req, resp) => {
    try {
        const categoriesId = req.params.id;

        const response = await categories.findByIdAndDelete(categoriesId);

        if (!response) {
            return resp.status(404).json({ error: 'Items not found' });
        }
        console.log('Data Deleted'.red);
        resp.status(200).json({ message: 'Items Delete Successfully' });

    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = router;
