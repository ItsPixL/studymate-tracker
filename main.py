from tracker import input_new_subject, log_session, input_subject_to_remove

# Startup CLI Menu
def main():
    while True:
        # Print options
        print("Welcome to StudyMate Tracker!")
        print("1. Add subject")
        print("2. Log session")
        print("3. View all sessions")
        print("4. View total time")
        print("5: Remove Subject")
        print("6. Exit")
        print()

        # Get user input
        choice = input("Choose an option: ")
        print()

        # Run something based on user input
        match choice:
            case "1":
                input_new_subject()
            case "2":
                log_session()
            case "3":
                # call view_all_sessions()
                print(3)
            case "4":
                # call view
                print(4)
            case "5":
                input_subject_to_remove()
            case "6":
                break
            case _:
                print("Invalid input")

main()