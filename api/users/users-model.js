const db = require('../../data/dbConfig')

module.exports = {
    add,
    find,
    findById,
    findBy,
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where('id', id)
        .first()
}

function findBy(filter) {
    return db('users').where(filter)

}
async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}