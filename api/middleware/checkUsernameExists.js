const { findBy } = require('../users/users-model')


module.exports = async (req, res, next) => {

    // 4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
    // the response body should include a string exactly as follows: "invalid credentials".
    // try{
    //     const [user] = await User.findBy({ username: req.body.username })
    //     if(user) {
    //         req.user = user
    //         console.log(user)
    //         next()
    //     } else {
    //         next({
    //             status: 401, 
    //             message: 'invalid credentials'
    //         })
    //     }
    // } catch(err) {
    //     next(err)
    // }

    try {
        const [user] = await findBy({ username: req.body.username })
        if (!user) {
            next({ status: 401, message: 'invalid credentials' })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }

};
