def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    vowels = 'aeiou'
    # builds set of keys and values from vowels
    frequency = {}.fromkeys(vowels,0)
    phrase =phrase.lower()

    for letter in phrase:
        if letter in vowels:
            # add one to value for every letter that is the same vowel
            frequency[letter] += 1

    return frequency

print(vowel_count('rithm school'))
print(vowel_count('HOW ARE YOU? i am great!'))