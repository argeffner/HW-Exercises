process.env.NODE_ENV = "test"

const request = require("supertest");
const app = require("../app");
const db = require("../db");

//why Doesn't this work? Ask Ted.

describe("Books Routes Test", function() {
    // create a book sample
    let sampleBook;

    beforeEach(async function() {
        let result = await  db.query(
            `INSERT INTO books (
                isbn, amazon_url, author,
                language, pages, publisher,
                title, year)
             VALUES(
                '6723912', 'https://amazon.com/camel',
                'Homey Joe', 'English', 56, 'I am lord',
                'Camels and Cigs', 1992)
                RETURNING isbn` );
        sampleBook = result.rows[0].isbn;
    });

    describe('GET /books', async function(){
        test("get all books from database", async () => {
          let response = await request(app)
          .get('/books');
          // toHaveProperty checks for keypath or key and value
          expect(response.body.books[0]).toHaveProperty('isbn');
          expect(response.body.books[0]).toHaveProperty('language');
          expect(response.body).toEqual({
                books: [
                    {isbn: '6723912',
                     amazon_url: 'https://amazon.com/camel', 
                     author: 'Homey Joe',
                     language: 'English', 
                     pages: 56, 
                     publisher: 'I am lord',
                     title: 'Camels and Cigs', 
                     year: 1992 
                    } 
                ]
          })
        })
    })



    describe('GET /books/:isbn', async () => {
        test('get the one book based on isbn', async () => {
            let response = await request(app)
            .get(`/books/${sampleBook}`)
            
            expect(response.body.book.isbn).toEqual(sampleBook);
            expect(response.body.book).toHaveProperty('isbn');
        })

        test('wrong isbn', async function(){
            let response = await request(app)
            .get(`/books/5`)
            expect(response.StatusCode).toEqual(404);
        })
    })



    describe('POST /books', async () => {
        test('[post a new book', async () => {
            let response = await request(app)
            .post('/books')
            .send(
                {isbn: '111222333',
                 amazon_url: 'https://amazon.com/goat',
                 author: 'Peter Piper',
                 language: 'English',
                 pages: 140,
                 publisher: 'purple penguin',
                 title: 'the perfect farm animal',
                 year: 2008
                }
            )
            // status code 201 request successful and created a resource
            expect(response.body.book).toHaveProperty('isbn');
            expect(response.StatusCode).toEqual(201);
        })

        test("not send all required keys and or values", async ()=> {
            let response = await request(app)
            .post('/books')
            .send({amazon_url: 'https://amazon.com/goat',publisher: 'purple penguin'})
            // bad post is a bad request status code 400
            expect(response.statusCode).toEqual(404)
        })
    })


    describe('PUT /books/:isbn', async function(){
        test('update a book', async () =>{
          let repsonse = await request(app)
          .put(`/books/${sampleBook}`)
          .send({
              amazon_url: 'https://amazon.com/thor',
              author: 'Thor',
              language: 'English',
              pages: 4000,
              publisher: 'Asgard 4ever',
              title: 'my family is gone',
              year: 2016
         })
         expect(repsonse.body.book.author).toEqual('Thor');
         expect(repsonse.body.book.publisher).toEqual('Asgard 4ever');
         expect(repsonse.body.book).toHaveProperty('isbn');
        })

        test('added extra to update error', async () =>{
          let repsonse = await request(app)
          .put(`/books/${sampleBook}`)
          .send({
              isbn: '111222333',
              amazon_url: 'https://amazon.com/thor',
              author: 'Thor',
              language: 'English',
              pages: 4000,
              publisher: 'Asgard 4ever',
              title: 'my family is gone',
              year: 2016
         })
         expect(response.statusCode).toEqual(400)
        })

        test('incorrect isbn', async() => {
          let repsonse = await request(app)
          .put(`/books/5`)
          expect(response.statusCode).toEqual(404) 
        })
    })


    describe('DELETE /books/:isbn', async function(){
        test('Deletes a book', async ()=>{
            let response = await request(app)
            .delete(`/books/${sampleBook}`)

            expect(response.body).toEqual({ message: "Book deleted" })
        })

        test('incorrect isbn', async ()=>{
            let response = await request(app)
            .delete('/books/567')

            expect(response.statusCode).toEqual(404)
        })
    })
});
afterEach(async () => {
    await db.query("DELETE FROM books");
});

afterAll(async function () {
    await db.end()
});