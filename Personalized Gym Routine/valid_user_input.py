def validate_user_input(prompt, input_type="text"):
    """
    Handles input and ensures it matches the required type.
    Prevents crashes from invalid numerical entries.
    """
    while True:
        user_data = input(prompt).strip()
        
        if not user_data:
            print("Error: Input cannot be blank.")
            continue
            
        if input_type == "number":
            try:
                # Attempt to convert to float for weight/reps
                return float(user_data)
            except ValueError:
                print(f"Error: '{user_data}' is not a valid number. Please try again.")
        else:
            # For text inputs like goals or body types
            return user_data