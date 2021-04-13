const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const Message = require("../models/message");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");


describe("User Routes Test", function() {

    // need tp pass in testUserToken
    let testUserToken;

    beforeEach(async function() {
        await db.query("DELETE FROM messages");
        await db.query("DELETE FROM users");

        let u1 = await  User.register({
            username: "test1",
            password: "password",
            first_name: "Test1",
            last_name: "Testy1",
            phone: "+14155550000",
        });

        let u2 = await User.register({
            username: "test2",
            password: "password2",
            first_name: "Test2",
            last_name: "Testy2",
            phone: "+14155551111",
        });

        let m1  = await Message.create({
            from_username: 'test1',
            to_username: 'test2',
            body: 'from t1 to t2'
        });

        let m2  = await Message.create({
            from_username: 'test2',
            to_username: 'test1',
            body: 'from t2 to t1'
        });
         // need to get a JsonWebToken
         testUserToken = jwt.sign({username: "test1"}, SECRET_KEY);
    });


     /*      GET /users/   */
    describe("GET /users/", function() {
        test("get all users", async function() {
          let response = await request(app)
            .get("/users")
            .send({_token: testUserToken});

        expect(response.body).toEqual({
            users: [
                {username: "test1", 
                 first_name: "Test1", 
                 last_name: "Testy1", 
                 phone: "+14155550000"},
                {username: "test2", 
                 first_name: "Test2", 
                 last_name:  "Testy2", 
                 phone: "+14155551111" }
                ]    
             });
         });
     })


     /*      GET /users/username   */
     describe("GET /users/:username", () => {
        test('get user from username', async () => {
          let response = await request(app)
          .get('/users/test1')
          .send({_token: testUserToken});

        expect(response.body).toEqual({
            user: {
                username: "test1",
                first_name: "Test1",
                last_name:  "Testy1",
                phone: "+14155550000",
                join_at: expect.any(String),
                last_login_at: expect.any(String)
            }
          });
        });

        test("incorrect username/missing user", async () => {
           let response = await request(app)
           .get('/users/incorrect')
           .send({_token: testUserToken})

        expect(response.statusCode).toEqual(401)
        })
     })


     /*      GET /users/username/to   get messages to username from other user*/
     describe("GET /users/:username/to", () => {
        test('get message from to_username', async () => {
          let response = await request(app)
          .get('/users/test1/to')
          .send({_token: testUserToken});
        // id is not defined so it can be any number
        expect(response.body).toEqual({
            messages: [
                     {id: expect.any(Number),
                      body: 'from t2 to t1',
                      sent_at: expect.any(String),
                      read_at: null,
                      from_user: {
                        username: "test2",
                        first_name: "Test2",
                        last_name:  "Testy2",
                        phone: "+14155551111"
                      }
                     }
                  ]
             });
        });

        test("no existing username", async () => {
            let response = await request(app)
            .get('/users/incorrect/to')
            .send({_token: testUserToken})

        expect(response.statusCode).toEqual(401)
        });

        test("no incorrect autherization code", async () => {
            let response = await request(app)
            .get('/users/test1/to')
            .send({_token: 'incorrect'})

        expect(response.statusCode).toEqual(401)

        });
     });


     /*      GET /users/username/from   get messages from username to other user*/
     describe("GET /users/:username/to", () => {
        test('get message from from_username', async () => {
          let response = await request(app)
          .get('/users/test1/from')
          .send({_token: testUserToken});
        // id is not defined so it can be any number
        expect(response.body).toEqual({
            messages: [
                     {id: expect.any(Number),
                      body: 'from t1 to t2',
                      sent_at: expect.any(String),
                      read_at: null,
                      to_user: {
                        username: "test2",
                        first_name: "Test2",
                        last_name:  "Testy2",
                        phone: "+14155551111"
                      }
                     }
                  ]
             });
        });

        test("no existing username", async () => {
            let response = await request(app)
            .get('/users/incorrect/to')
            .send({_token: testUserToken})

        expect(response.statusCode).toEqual(401)
        });

        test("no incorrect autherization code", async () => {
            let response = await request(app)
            .get('/users/test1/to')
            .send({_token: 'incorrect'})

        expect(response.statusCode).toEqual(401)

        });
     });
});

afterAll(async function () {
    await db.end();
});