"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """set up the base generator. In the starting case set all params to start"""  

        self.start = self.count = start      


    def __repr__(self):
        """shows output of input and count"""

        return f"<S-Generator start={self.start}, count={self.count}>"
    
    def generate(self):
        """counts up for each input"""

        self.count += 1
        return self.count - 1

    def reset(self):
        """reset count to start"""
        self.count = self.start
        
    """ I don't like the Doctest method setup they have for reset and generate 
        generate should add 1 to initial value an out put the value
        reset should show that it is reset to the start value
    """

