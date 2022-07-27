import mongodb from 'mongoDB'; // get access to ObjectId

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
}