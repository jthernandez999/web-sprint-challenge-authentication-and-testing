const User = require('../users/users-model')


module.exports = async(req, res, next) => {

    // 4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
    // the response body should include a string exactly as follows: "invalid credentials".
try {
    const user = { username: req.body.username, password: req.body.password }
    const [dbUser] = await User.findBy({ username: req.body.username, password: req.body.password })
    console.log('from checkusernameExists', user)
    if(!dbUser) {
        next({
            status: 401, 
            message: 'invalid credentials'
        })
    } else {
        req.user = user
        next()
    }
} catch (err) {
    next(err)
}


};
