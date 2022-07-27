// contains different routes to which people can go
export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get((req, res) => res.send('hello world'));
        return router;
    }
}