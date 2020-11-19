def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?

    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2

    Returns True if they have any hobbies in common, False is not.

        >>> elmo = ('Elmo', 5, ['hugging', 'being nice'])
        >>> sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
        >>> gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

        >>> friend_date(elmo, sauron)
        False

        >>> friend_date(sauron, gandalf)
        True
    """
    #should use intersection method
    
    sa = set(a[2])
    sb = set(b[2])

    if sa & sb:
        return True
    else:
        return False

print(friend_date(('Elmo', 5, ['hugging', 'being nice']), ('Sauron', 5000, ['killing hobbits', 'chess'])))
print(friend_date(('Sauron', 5000, ['killing hobbits', 'chess']), ('Gandalf', 10000, ['waving wands', 'chess'])))