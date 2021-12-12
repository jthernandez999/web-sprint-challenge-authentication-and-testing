

module.exports = (req, res, next) => {

    const { password, username } = req.body
if (!username || !password){
    next({ status: 401, message: 'invalid credentials' })
} else {
    next()
}

};



