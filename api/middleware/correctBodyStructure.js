

module.exports = (req, res, next) => {

    // 3- On FAILED registration due to `username` or `password` missing from the request body,
    // the response body should include a string exactly as follows: "username and password required".

    if (!req.body.username || !req.body.password) {
        next({
            status: 401,
            message: 'username and password required'
        })
    } else {
        next()
    }
};
