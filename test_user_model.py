"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows
# need to import exc for the integrity error to work
from sqlalchemy import exc

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler_test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        # create sample users from signup
        u1 = User.signup("test1", "email1@email.com", "password", None)
        uid1 = 1234
        u1.id = uid1

        u2 = User.signup("test2", "email2@email.com", "password", None)
        uid2 = 2468
        u2.id = uid2

        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)


    ######## Following tests #########
# I saw these tests in the solution
    def test_user_follows(self):
        # adds user2 to the list
        self.u1.following.append(self.u2)
        db.session.commit()
        # checks index of the model to see if u2 turns to the main following user
        self.assertEqual(len(self.u2.following), 0)
        # checks index of the model to see if u2 turns to the second follower user
        self.assertEqual(len(self.u2.followers), 1)
        # checks index of the model to see if u1 is the main follower user
        self.assertEqual(len(self.u1.followers), 0)
        # checks index of the model to see if u2 turns to the second following user
        self.assertEqual(len(self.u1.following), 1)

        #  determines if the 'follower' user is the correct user
        self.assertEqual(self.u2.followers[0].id, self.u1.id)
        #  determines if the 'following' user is the correct user
        self.assertEqual(self.u1.following[0].id, self.u2.id)

    def test_is_following(self):
        # first add user 2 to user 1 follow
        self.u1.following.append(self.u2)
        db.session.commit()
        # check if user user1 is following user2
        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    def test_is_followed_by(self):
        # first add user 2 to user 1 follow
        self.u1.following.append(self.u2)
        db.session.commit()
        # check if user user1 is followed by user2 
        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u1.is_followed_by(self.u2))

    ###### Create new user ########
    def test_valid_signup(self):
        u_test = User.signup("testy123", "test@gmail.com", "password", None)
        uid = 12345
        u_test.id = uid
        db.session.commit()

        u_test = User.query.get(uid)
        # check to see that get(uid) works
        self.assertIsNotNone(u_test)
        # check username passes
        self.assertEqual(u_test.username, 'testy123')
        # check email passes
        self.assertEqual(u_test.email, 'test@gmail.com')
        # check password passes
        self.assertNotEqual(u_test.password, 'password')
        # check for Bcrypt (Bcrypt string starts with $2b$)
        self.assertTrue(u_test.password.startswith('$2b$'))

    def test_invalid_username_signup(self):
        invalid = User.signup(None, 'test@gmail.com', 'password', None)
        uid = 1234567
        invalid.id = uid
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_email_signup(self):
        invalid = User.signup('testy123', None, 'password', None)
        uid = 83023479
        invalid.id = uid
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()
    
    def test_invalid_password_signup(self):
        # pass an empty string
        with self.assertRaises(ValueError) as context:
            User.signup("testy123", "test@gmail.com", "", None)
        # need to pass none 
        with self.assertRaises(ValueError) as context:
            User.signup("testy123", "test@gmail.com", None, None)

    ######### Authentication ############

    def test_valid_authentication(self):
        u = User.authenticate(self.u1.username, 'password')
        # check that there is a value u
        self.assertIsNotNone(u) 
        # check if the u id is u1
        self.assertEqual(u.id, self.uid1)

    def test_invalid_username(self):
        self.assertFalse(User.authenticate('wrong_username', 'password'))

    def test_wrong_password(self):
        self.assertFalse(User.authenticate(self.u1.username, 'wrong_password'))
