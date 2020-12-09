from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

    # TODO -- write tests for every view function / feature!
class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self): 
        """dsiplay all items in session items"""

        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('numplays'))
            self.assertIn(b'<p> HIGH SCORE:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Remaining:', response.data)
    
    def test_valid_word(self):
        """Test if word is valid by modifying the board in the session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
        response = self.client.get('/check?word=cat')
        self.assertEqual(response.json['result'], 'ok')
    
    def test_invalid_word(self):
        """Test if word is in the dictionary"""

        self.client.get('/')
        response = self.client.get('/check?word=impossible')
        self.assertEqual(response.json['result'], 'not-on-board')

    def non_english_word(self):
        """Test if word is actually on the board"""

        self.client.get('/')
        response = self.client.get('/check?word=bazongaloobambam')
        self.assertEqual(response.json['result'], 'not-word')

