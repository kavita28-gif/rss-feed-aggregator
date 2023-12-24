const express = require('express');
const router = express.Router();
const Feed = require('../models/feed');
const { authentication, admin} = require('../middleware/auth');
const cookieParser = require("cookie-parser");

// Set authentication cookie
router.use(cookieParser());

// CRUD operations for feeds

// Create - Add a new RSS feed URL
router.post('/add', authentication, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
			return res.status(401).json({ error: "Please enter url" });
		}
    const feed = await Feed.create({ url, addedBy: req.user.userId, status: 'pending' });
    return res.status(200).json({ message: "RSS feed URL added successfully", feed});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// Read - Get all RSS feed URLs
router.get('/get', authentication, async (req, res) => {
  try {
    const feeds = await Feed.findAll();
    if(!feeds) {
      return res.status(401).json({ error: "RSS feed url not found" });
    }
    return res.status(200).json(feeds);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// Read - Get single RSS feed URL using Id
router.get('/get/:id', authentication, async (req, res) => {
  try {
    const id = req.params.id;
    if(isNaN(id)) {
        return res.status(400).json({ error : "Invalid Id format.."})
    }
    const feed = await Feed.findOne({ where: {id: id }});
    if(!feed) {
      return res.status(401).json({ error: "RSS feed url not found" });
    }
    return res.status(200).json(feed);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// Update - Update RSS feed URL using Id
router.put('/edit/:id', [authentication, admin], async (req, res) => {
  try {
    const id = req.params.id;
    if(isNaN(id)) {
      return res.status(400).json({ error : "Invalid Id format.."})
    }
    let existingFeed = await Feed.findOne({ where:{id: id }});
    
    if(!existingFeed) {
      return res.status(400).json({ error : "URL not found.."})
    }
    Object.assign(existingFeed, req.body);
    const updatedFeed = await existingFeed.save();
    return res.status(200).json({ message: "Updated RSS feed URL successfully", updatedFeed});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// Delete - Delete RSS feed URL using Id
router.delete('/delete/:id', [authentication, admin], async(req, res) => {
  try {
      const id = req.params.id;

      if(isNaN(id)) {
          return res.status(400).json({ error : "Invalid Id format.."})
      }

      const existingFeed = await Feed.findOne({ where:{id: id }});
      if(!existingFeed) {
          return res.status(400).json({ error : "Item not found.."})
      }
      const deletedFeed = await existingFeed.destroy();
      return res.status(200).json({ message: "Deleted RSS feed URL successfully", deletedFeed});
  } catch (error) {
      return res.status(500).json({error: error.message});
  }
})

module.exports = router;
