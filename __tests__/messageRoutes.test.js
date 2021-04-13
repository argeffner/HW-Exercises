const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const Message = require("../models/message");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");


describe("message Routes Test", function() {

    // need tp pass in testUserToken
    let testUserToken;

    beforeEach(async function() {
        await db.query("DELETE FROM messages");
        await db.query("DELETE FROM users");
        // need to restart id sequence or else won't work correctly
        //ALTER SEQUENCE [schema_name ] sequence_name  
        await db.query("ALTER SEQUENCE messages_id_seq RESTART WITH 1 INCREMENT BY 1");

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



     /*      GET /messages/:id    */
    describe("GET /messages/:id", function() {
        test("get message from id", async function() {
          let response = await request(app)
            .get("/messages/1")
            .send({_token: testUserToken});

        expect(response.body).toEqual({
            message: {id: 1,
                body: 'from t1 to t2',
                sent_at: expect.any(String),
                read_at: null,
                from_user: {username: "test1", 
                            first_name: "Test1", 
                            last_name: "Testy1", 
                            phone: "+14155550000"},
                to_user: {username: "test2", 
                          first_name: "Test2", 
                          last_name:  "Testy2", 
                          phone: "+14155551111" }
                     }
                 });
             });
        // test message from user2
        test("get message from id", async function() {
            let response = await request(app)
              .get("/messages/2")
              .send({_token: testUserToken});

        expect(response.body).toEqual({
            message: {id: 2,
                body: 'from t2 to t1',
                sent_at: expect.any(String),
                read_at: null,
                from_user: {username: "test2", 
                            first_name: "Test2", 
                            last_name: "Testy2", 
                            phone: "+14155551111"},
                to_user: {username: "test1", 
                          first_name: "Test1", 
                          last_name: "Testy1", 
                          phone: "+14155550000"}
                     }
                 });
             });
            //  test url with non existant id
        test("no existing message id", async function() {
            let response = await request(app)
            .get("messages/999")
            .send({_token: testUserToken})

        expect(response.statusCode).toEqual(404)
        });
    })



    /*       POST /messages/    */
    describe("POST /messages/", function() {
        test("post message data", async () => {
            let response = await request(app)
            .post("/messages/")
            .send({
                to_username: "test2",
                body: "from t1 to t2",
                _token: testUserToken   //need to pass in token
            })

            expect(response.body).toEqual({
                message: {id: 3, 
                          from_username: "test1", 
                          to_username: "test2", 
                          body: "from t1 to t2", 
                          sent_at: expect.any(String)
                        }
            }); 
        });

        test("wrong username", async () => {
            let response = await request(app)
            .post("/messages/")
            .send({
                to_username: "wrongy user",
                body: "lord of dodos",
                _token: testUserToken
            });

        expect(response.statusCode).toEqual(500)
        });
    });


    /*       POST /messages/:id/read   */
    describe("POST /messages/:id/read", () => {
        test("read message from id", async () => {
            let response = await request(app)
            .post("/messages/2/read")
            .send({_token: testUserToken});

        expect(response.body).toEqual({
            message: {id: 2,
                      read_at: expect.any(String)
                     }
                });
            });
        test("non existant id", async function() {
            let response = await request(app)
            .post("/messages/999/read")
            .send({_token: testUserToken});
        
        expect(response.statusCode).toEqual(404)
        });  
    });
});

afterAll(async () => {
    await db.end();
  });