def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """

    # NOTE: don't worry about an optimized runtime here; it's fine if
    # you have a runtime worse than O(n)

    # NOTE: you can sort lists with lst.sort(), which works in place (mutates);
    # you may find it helpful to research the `sorted(iter)` function, which
    # can take *any* type of list-like-thing, and returns a new, sorted list
    # from it.

    # turn into set to remove double values
    now = set(ages)
    # turn back to list
    ages = list(now)

    # find max and remove from ages list
    oldest = max(ages)
    old = ages.index(oldest)
    one = ages.pop(old)

    # same as other process for 2nd max
    two_oldest = max(ages)
    two_old = ages.index(two_oldest)
    two = ages.pop(two_old)
    
    newages = (two, one)
    
    return newages

print(two_oldest_ages([1, 2, 10, 8]))
print(two_oldest_ages([6, 1, 9, 10, 4]))
print(two_oldest_ages([1, 5, 5, 2]))

# code below is short version for code

# uniq_ages = set(ages)
#     oldest = sorted(uniq_ages)[-2:]
#     return tuple(oldest)