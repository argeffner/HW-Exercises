"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a code, a title, a list of prompts,
    and the text of the template.

        >>> s = Story(
        ...     "simple",
        ...     "A Simple Tale",
        ...     ["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, code, title, words, text):
        """Create story with words and template text."""

        self.code = code
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story3 = Story(
    "fairytale",
    "Story book",
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
    "gaga",
    "Super Excited Girls",
    ["noun", "verb"],
    """OMG!! I like totally love to {verb} a {noun}!"""
)

story1 = Story(
    "travel",
    "the Ricktale of Mortimer",
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """RICK: OK Morty, time to enter C835R! 
       MORTY: Where is that Rick?   
       RICK: The world with a {noun} {verb} me {adjective} than {plural_noun}.     Do I have to simplify this for you Morty?  {place} Yeesh."""
)

# Make dict of {code:story, code:story, ...}
stories = {s.code: s for s in [story1, story2, story3]}