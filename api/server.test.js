const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

const Jokes = require('../api/jokes/jokes-data')



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  describe('index route', () => {

    it('should return an OK status code(200)', async () => {
      const expectedcode = 200;
      const response = await request(server).get('/')
      expect(response.status).toEqual(expectedcode)
    })
    it('should return a JSON object', async () => {
      const expectedBody = { message: 'API is up' }
      const response = await request(server).get('/')
      expect(response.body).toEqual(expectedBody)
    })
  })


})

describe('jokes endpoint', () => {
  describe('Jokes', () => {
    let data
    beforeEach(async () => {
      data = await Jokes
    })

    it('should return an invalid status code(403) if not authorized', async () => {
      const expectedCode = 403;
      const response = await request(server).get('/api/jokes')
      expect(response.status).toEqual(expectedCode)
    })

    test('resolves all jokes in the db', async () => {
      expect(data.length).toBe(3)
    })

    test('resolves to the correct shape', async () => {
      expect(data).toMatchObject(Jokes)
      expect(data).toEqual([
        {
          "id": "0189hNRf2g",
          "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
        },
        {
          "id": "08EQZ8EQukb",
          "joke": "Did you hear about the guy whose whole left side was cut off? He's all right now."
        },
        {
          "id": "08xHQCdx5Ed",
          "joke": "Why didn’t the skeleton cross the road? Because he had no guts."
        },
      ])
    })
  })
})


describe('[POST] api/auth/register', () => {

  const baseUrl = 'http://localhost:3300/api'


  test('should return message: username taken, if username already in database', async () => {
    const user = { username: 'thom herz', password: 1234 }
    const response = await request(baseUrl).post('/auth/register').send(user)
    expect(response.body).toMatchObject({ message: 'username taken' })
  })

  test('should return status 422, if username taken', async () => {
    const user = { username: 'thom herz', password: 1234 }
    // const expectedCode = 422
    const response = await request(baseUrl).post('/auth/register').send(user)
    expect(response.status).toBe(422)
  })

  test('should return a JSON object', async () => {
    const response = await request(baseUrl).get('/auth/register').send({
      username: 'thom herz',
      password: '1234'
    })
    expect(response.type).toEqual('text/html')
  })
})

describe('[POST] api/auth/login', () => {

  const baseUrl = 'http://localhost:3300/api'


  test('should return an ok status code(200) if valid credentials are passed in', async () => {
    const expectedCode = 200;
    const response = await request(baseUrl).post('/auth/login').send({
      "username": "thom herz",
      "password": "1234"
    })
    expect(response.status).toBe(expectedCode)
  })

  test('[POST] api/auth/login responds with a message', async () => {

    const response = await request(baseUrl).post('/auth/login').send({
      "username": "thom herz",
      "password": "1234"
    })
    expect(response.body).toMatchObject({message:'welcome thom herz'})
  })

  test('should return a JSON object', async () => {
    const response = await request(baseUrl).get('/auth/login').send({
      username: 'thom herz',
      password: '1234'
    })
    expect(response.type).toEqual('text/html')
  })
  
})
