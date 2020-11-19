def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    reverse = phrase[::-1].replace(" ","")
    normal = ''.join(phrase.split())

    if normal.lower() == reverse.lower():
        return True
    else:
        return False

print(is_palindrome("phrase"))
print(is_palindrome("Race car"))
print(is_palindrome("no on"))
print(is_palindrome("yo toy"))
print(is_palindrome("Now on"))