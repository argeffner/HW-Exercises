"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """ Will use simple file insead of word to pass doctest

    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """

    def __init__(self, path):
        "read dictionary and returns # of items it read"

        d_file = open(path)
        self.words = self.parse(d_file)
        print(f"{len(self.words)} words read")
    
    def parse(self, d_file):
        """Parse file returns list of words"""

        # takes the word from the file
        #  .split() removes all the spaces from beginning and end of string
        word = [w.strip() for w in d_file]
        return word
    
    def random(self):
        """selects a random word"""

        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    """ special wordfinder does same thing but also removes comments

    >>> swf = SpecialWordFinder("complex.txt")
    5 words read

    >>> swf.random() in ["kale", "parsnips", "apple", "pear", "mango"]
    True

    >>> swf.random() in ["kale", "parsnips", "apple", "pear", "mango"]
    True

    >>> swf.random() in ["kale", "parsnips", "apple", "pear", "mango"]
    True

    >>> swf.random() in ["kale", "parsnips", "apple", "pear", "mango"]
    True
    """

    def parse(self, d_file):
        """Parse file returns list of words and no comments"""

        return [w.strip() for w in d_file if w.strip() and not w.startswith('#')]
         

