def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    total = 0
    # len(matrix) is the number of rows in matrix
    for x in range(len(matrix)):

        total += matrix[x][x]

        total += matrix[x][-1-x]
    # both will go diagonally in different directions
    return total
    
print(sum_up_diagonals([[1,2],[30,40],]))
print(sum_up_diagonals([[1, 2, 3],[4, 5, 6],[7, 8, 9],]))