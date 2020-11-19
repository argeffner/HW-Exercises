def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """
# shortest method   return lst[::2]
    arr = []

    for index, item in enumerate(lst):
        if index % 2 == 0:
            arr.append(item)

    return arr

print(remove_every_other([1, 2, 3, 4, 5]))