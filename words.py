def upwords(words):
    """ Print words in Uppercase letters """

    for word in words:
        print(word.upper())

upwords(["hello", "goodbye", "yes"])

def upwords2(words):
    """ Print words that start with letter E (lower or upper case)  """

    for word in words:
        if word.startswith("E") or word.startswith("e"):
            print(word.upper())

upwords2(["hello", "ey", "goodbye", "yo", "es"])

def upwords3(words, starting_letter): 

    """ this should print "HELLO", "HEY", "YO", and "YES"

    print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})
    """

    for word in words:
        for let in starting_letter:
            if word.startswith(let):
                print(word.upper())
                

upwords3(["hello", "hey", "goodbye", "yo", "yes", "puppy", "cattywompa"], {"h", "y","c"})
