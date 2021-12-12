const { findBy } = require('../users/users-model')

module.exports = async (req, res, next) => {

    // 4- On FAILED registration due to the `username` being taken,
    // the response body should include a string exactly as follows: "username taken".
try {
const users = await findBy({ username: req.body.username })
    if(!users.length){
        next()
    } else {
        next({ status: 422, message: 'username taken'})
    }
} catch(err) {
    next(err)
}

  };
  