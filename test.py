from unittest import TestCase
from models import db, Cupcake
from app import app

# Use test has separate database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_test'
app.config['SQLALCHEMY_ECHO'] = False

# Gives actual errors that are not HTML related
app.config['TESTING'] = True

db.drop_all()
db.create_all()

# creating new cupcake test data
CUPCAKE_DATA = {
    "flavor": = "Mocha",
    "size": = "small",
    "rating": = 7,
    "image": = "http://test.com/cupcake.jpg"
}
CUPCAKE_DATA_2 = {
    "flavor": = "Vanilla",
    "size": = "large",
    "rating": = 10,
    "image": = "http://test.com/cupcake2.jpg"
}

class CupcakeViewsTestCase(TestCase):
    """Tests for views of API."""

    def setUp(self):
        """Make demo data."""

        Cupcake.query.delete()
        # **kwargs passes the data of all items stored in that object
        cupcake = Cupcake(**CUPCAKE_DATA)
        db.session.add(cupcake)
        db.session.commit()

        self.cupcake = cupcake

        
    def test_cupcake_list(self):
        with app.test_client() as client:
            resp = client.get("/api/cupcakes")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'cupcakes': [{
                    'id': self.cupcake.id,
                    'flavor': 'Mocha',
                    'size': 'small',
                    'rating': 7,
                    "image": = "http://test.com/cupcake.jpg"
                }]})
    
    def test_get_cupcake():
        with app.test_client() as client:
            # need to store URL f string for interchangble query
            url = f'/api/cupcakes/{self.cupcake.id}'
            #  if you put f'/api.... in the get response it will not work
            resp = client.get(url)
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'cupcake': {
                    'id': self.cupcake.id,
                    'flavor': 'Mocha',
                    'size': 'small',
                    'rating': 7,
                    "image": = "http://test.com/cupcake.jpg"
                }})
    def test_get_cupcake_missing(self):
        with app.test_client() as client:
            # make up random id to get error code
            url = f"/api/cupcakes/14456"
            resp = client.get(url)

            self.assertEqual(resp.status_code, 404)
    
    def test_create_cupcake(self):
        with app.test_client() as client:
            url = "/api/cupcakes"
            resp = client.post(url, json=CUPCAKE_DATA_2)
            # 201 is for a newly created item
            self.assertEqual(resp.status_code, 201)

            # checking first what id we are getting since its unknown
            self.assertIsInstance(resp.json['cupcake']['id'], int)
            del resp.json['cupcake']['id']

            self.assertEqual(resp.json, {
                "cupcake": {
                    "flavor": = "Vanilla",
                    "size": = "large",
                    "rating": = 10,
                    "image": = "http://test.com/cupcake2.jpg"
                }
            })
            # checking to see if there are two cupcakes
            self.assertEqual(Cupcake.query.count(), 2)


    def test_update_cupcake(self):
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            resp = client.patch(url, json=CUPCAKE_DATA_2)
            # patch counts as 200 status code
            self.assertEqual(resp.status_code, 200)
            
            self.assertEqual(resp.json, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": = "Vanilla",
                    "size": = "large",
                    "rating": = 10,
                    "image": = "http://test.com/cupcake2.jpg"
                }
            })
            # just checking to see if there is 1 cupcake
            self.assertEqual(Cupcake.query.count(), 1)

    def test_update_cupcake_missing(self):
        with app.test_client() as client:
            url = f"/api/cupcakes/123870345"
            resp = client.patch(url, json=CUPCAKE_DATA_2)
            # check for random id to make error
            self.assertEqual(resp.status_code, 404)

     def test_delete_cupcake(self):
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            resp = client.delete(url)
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(resp.json, {"message": "Deleted"})
            # checks to see if cupcake was deleted
            self.assertEqual(Cupcake.query.count(), 0)

    def test_delete_cupcake_missing(self):
        with app.test_client() as client:
            url = f"/api/cupcakes/204851"
            resp = client.delete(url)
            # check random id to create error
            self.assertEqual(resp.status_code, 404)