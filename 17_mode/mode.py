def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    counter = {}
    # create set with key(nums) and values(counter)
    for num in nums:
        counter[num] = counter.get(num, 0) + 1
    # set the max val which is th max counter
    max_val = max(counter.values())
    # iterate to find the max val and return the num
    for (num,val) in counter.items():
        if val == max_val:
            return num

print(mode([1, 2, 1]))
print(mode([2, 2, 3, 3, 2]))