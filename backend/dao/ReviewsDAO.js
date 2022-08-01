import mongodb from 'mongoDB'; // get access to ObjectId

// model : Mongoose/MongoDB :: DAO : MongoDB (analogy)
export default class ReviewsDAO {
    static reviews; 

    // convert id string to MongoDB Object id 
    static ObjectId = mongodb.ObjectId;

    static async injectDB(conn) {
        if(ReviewsDAO.reviews) {
            return;
        }
        try {
            ReviewsDAO.reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        }
        catch (e) {
            console.log(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    // add review
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date,
                review,
                movie_id: ReviewsDAO.ObjectId(movieId)
            }
            return await ReviewsDAO.reviews.insertOne(reviewDoc);
        }
        catch(e) {
            console.error(`unable to post review: ${e}`);
            return { error: e };
        }
    }

    // update review
    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await ReviewsDAO.reviews.updateOne(
                { user_id: userId, _id: ReviewsDAO.ObjectId(reviewId) },
                { $set: { review, date } }
            );
            return updateResponse;
        }
        catch(e) {
            console.error(`unable to update review: ${e}`);
            return { error: e }
        }
    }

    // delete review
    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await ReviewsDAO.reviews.deleteOne({
                _id: ReviewsDAO.ObjectId(reviewId),
                user_id: userId
            });
            return deleteResponse;
        }
        catch(e) {
            console.error(`unable to delete review: ${e}`);
            return { error: e }
        }
    }
}
