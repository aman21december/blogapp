const { Op,Sequelize } = require("sequelize");
const Post = require("../../models/Post");
const sequelize =require("./../../config/database");
const { SERVER_ERROR } = require("../../helper/status-codes");
class SearchandFilter{
    async search(req,res,next){
        const { query } = req.query;
    
        if (!query) {
            return({ error: 'Query parameter is required' });
        }
    
        try {
            const posts = await Post.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${query}%` } },
                        { content: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            return({posts});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async filter(req,res,next){
        const { category, tags, startDate, endDate } = req.query;
        const filters = {};
    
        if (category) {
            filters.category = category;
        }
    
        if (tags) {
            const tagsArray = tags.split(',');
            filters[Op.and] = tagsArray.map(tag => {
                return sequelize.literal(`JSON_CONTAINS(tags, '["${tag}"]')`);
            });
        }
    
        if (startDate || endDate) {
            filters.created_At = {};
            if (startDate) {
                filters.created_At[Op.gte] = new Date(startDate);
            }
            if (endDate) {
                filters.created_At[Op.lte] = new Date(endDate);
            }
        }
    
        try {
            const posts = await Post.findAll({ where: filters });
    
            return(posts);
        } catch (error) {
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
        }
    }
}

module.exports={SearchandFilter};