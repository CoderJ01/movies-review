import e from 'express';
import ReviewsDAO from '../dao/ReviewsDAO.js';

export default class ReviewsController {

    // add movie review
    static async apiPostReview(req, res, next) {
        try {
            // retrieve info from request's body parameter
            const movieId = req.body.movie_id;
            const { review } = req.body;
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

    // update movie review
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const { review } = req.body;

            const date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id, // ensure that review is updated by original creator
                review,
                date
            );

            const { error } = ReviewResponse;
            if(error) {
                res.status.json({ error });
            }

            if (ReviewResponse.modifiedCount === 0) {
                throw new Error('Unable to update review. User may not be original poster');
            }

            res.json({ status: 'success'});
        }
        catch {
            res.status(500).json({ error: e.message });
        }
    }

    // delete movie review
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );

            res.json({ status: 'success' });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}