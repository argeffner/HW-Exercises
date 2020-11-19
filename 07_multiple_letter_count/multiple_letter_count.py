def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    frequency = {}

    for letter in phrase:
        if letter in frequency:
            frequency[letter] += 1
        else:
            frequency[letter] = 1

    return frequency

print(multiple_letter_count("phrase"))
print(multiple_letter_count("supercalifraginlisticexpialidocious"))