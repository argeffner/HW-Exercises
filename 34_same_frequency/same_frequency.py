def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    answer1 = list(str(num1))
    answer2 = list(str(num2))
    final1 = answer1.sort()
    final2 = answer2.sort()
    # for some reason answer returns sorted even though I stored it as final
    return answer1 == answer2

print(same_frequency(551122, 221515))
print(same_frequency(321142, 3212215))
print(same_frequency(1212, 2211))

# other method that using different logic

# def same_frequency(num1, num2):
#     counter1 = {}
#     counter2 = {}
#     num1 = str(num1)
#     num2 = str(num2)
 
#     for num in num1:
#         counter1[num] = counter1.get(num, 0) + 1
    
#     for num in num2:
#         counter2[num] = counter2.get(num, 0) + 1
    
#     return counter1 == counter2