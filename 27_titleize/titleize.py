def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    #shortest method:  return phrase.title()
    sentence = ' '.join([letter.capitalize() for letter in phrase.split()])

    return sentence

print(titleize('this is awesome'))
print(titleize('oNLy cAPITALIZe fIRSt'))