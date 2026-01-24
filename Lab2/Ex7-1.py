def fahrenheit_to_celsius(fahrenheit_value):
    """
    Converts a temperature from Fahrenheit to Celsius.
    
    Parameters:
        fahrenheit_value (float): Temperature in Fahrenheit
    
    Returns:
        float: Temperature in Celsius
    """
    return (fahrenheit_value - 32) * (5 / 9)

# Test the function with user input
user_input = float(input("Enter the temperature in Fahrenheit: "))
celsius_result = fahrenheit_to_celsius(user_input)
print(f"{user_input}°F is equivalent to {celsius_result:.2f}°C")

# Additional test cases
print("32°F test:", fahrenheit_to_celsius(32))   # Expected: 0°C
print("212°F test:", fahrenheit_to_celsius(212)) # Expected: 100°C