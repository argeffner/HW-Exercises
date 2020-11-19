def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """

    true_vals = [val for val in lst if val]
    return true_vals

print(compact([0, 1, 2, '', [], False, (), None, 'All done']))