def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    counter = 0

    for par in parens:
        if par == '(':
            counter += 1
        elif par == ')':
            counter -= 1
        
        if counter < 0:
            return False
    
    return counter == 0

print(valid_parentheses("()"))
print(valid_parentheses(")()"))
print(valid_parentheses("((())"))
print(valid_parentheses(")()("))
print(valid_parentheses("(()())"))
