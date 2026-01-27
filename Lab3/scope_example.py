# This program demonstrates variable scope in Python.
# Name: Nazca
# Date: 2026-01-27

def calculate_discounted_price(price):
    #global discount 
    discount = 0.9
    price = price * discount
    price(f"Inside function, discounted price: {price:.2f}")
    return price

discount = 0.6
price = 100.0
print(f"Original price before function call {price:.2f}")
discounted_price = calculate_discounted_price(price)

print(f"Original price after function call: {price:.2f}")
print("Discount=", discount)


