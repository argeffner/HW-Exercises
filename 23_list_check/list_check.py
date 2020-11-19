def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """

    x = 1

    for item in lst:
        if isinstance(item, (list)):
            x = x * 1
        else:
            x = x * 0 

    if x == 1:
        return True
    else:
        return False

print(list_check([[1], [2, 3]]))
print(list_check([[1], "nope"]))