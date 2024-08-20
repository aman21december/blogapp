const Post=require("../models/Post")

const trackViews = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user ? req.user.id : req.ip;
    const viewTimeout = 10 * 60 * 1000; // 10 minutes
  
    if (!req.session.views) {
      req.session.views = {};
    }
     const lastViewed = req.session.views[id];
   
    if (lastViewed && Date.now() - lastViewed < viewTimeout) {
      return next(); // Skip incrementing the view count
    }
  
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Increment the views count
      post.views += 1;
      await post.save();
  
      // Update session with the last viewed timestamp
      req.session.views[id] = Date.now();
  
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports=trackViews;