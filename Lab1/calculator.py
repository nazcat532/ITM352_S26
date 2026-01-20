def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

def power(x, y):
    return x ** y

def modulus(x, y):
    if y == 0:
        raise ValueError("Cannot modulus by zero")
    return x % y

def main():
    while True:
        try:
            num1_input = input("Enter first number (or 'q' to quit): ").strip()
            if num1_input.lower() == 'q':
                break
            num1 = float(num1_input)
            num2_input = input("Enter second number: ").strip()
            num2 = float(num2_input)
            operation = input("Choose operation (+, -, *, /, **, %, q to quit): ").strip()

            if operation == '+':
                result = add(num1, num2)
            elif operation == '-':
                result = subtract(num1, num2)
            elif operation == '*':
                result = multiply(num1, num2)
            elif operation == '/':
                result = divide(num1, num2)
            elif operation == '**':
                result = power(num1, num2)
            elif operation == '%':
                result = modulus(num1, num2)
            elif operation.lower() == 'q':
                break
            else:
                print("Invalid operation")
                continue

            print(f"Result: {result}")
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()