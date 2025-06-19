from tracker import add_subject

# Startup CLI Menu
def main():
    while True:
        # Print options
        print("Welcome to StudyMate Tracker!")
        print("1. Add subject")
        print("2. Log session")
        print("3. View all sessions")
        print("4. View total time")
        print("5. Exit")

        # Get user input
        choice = input("Choose an option: ")

        # Run something based on user input
        match choice:
            case "1":
                add_subject()
            case "2":
                # call log_session()
                print(2)
            case "3":
                # call view_all_sessions()
                print(3)
            case "4":
                # call view
                print(4)
            case "5":
                break
            case _:
                print("Invalid input")

main()