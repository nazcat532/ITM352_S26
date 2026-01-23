# Ask the user to enter their birth year
birth_year_str = input("Enter the year you were born (4 digits): ")
# Convert the input from string to integer
birth_year = int(birth_year_str)

# Calculate age using the given current year
current_year = 2026
age = current_year - birth_year

# Print the result
print("You entered:", birth_year)
print("Your age is:", age)