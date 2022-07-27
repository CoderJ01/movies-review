import ReviewsDAO from '../dao/ReviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            // retrieve info from request's body parameter
            const movieId = req.body.movieId;
            const { review } = req.bdoy;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };

            const date = new Date();

            // retrieve each field
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );
            // return success if post works
            res.json({ status: 'success' });
        }
        catch(e) {
            // return error if post fails
            res.status(500).json({error: e.message });
        }
    }
}