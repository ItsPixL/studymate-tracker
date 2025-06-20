from tracker import input_new_subject, log_session, input_subject_to_remove, view_all_sessions, view_total_time
from colorama import init, Fore, Style
init(autoreset=True)

def stop(): print("\n" + Style.BRIGHT + "Thanks for using" + Fore.CYAN + " StudyMate " + Fore.RESET + "Your progress is saved: keep showing up, and the results will follow. Until next time, stay focused and keep learning!" + "\n")

# Startup CLI Menu
def main():
    print(Style.BRIGHT + "-" * 50)
    try:
        while True:
            # Print options
            print(Style.BRIGHT + "📚 Welcome to " + Fore.CYAN + "StudyMate" + "\n")
            print(Fore.YELLOW + "1. " + Style.RESET_ALL + "Add subject")
            print(Fore.YELLOW + "2. " + Style.RESET_ALL + "Log session")
            print(Fore.YELLOW + "3. " + Style.RESET_ALL + "View all sessions")
            print(Fore.YELLOW + "4. " + Style.RESET_ALL + "View total time")
            print(Fore.YELLOW + "5. " + Style.RESET_ALL + "Remove subject")
            print(Fore.YELLOW + "6. " + Style.RESET_ALL + "Exit")
            print()

            # Get user input
            choice = input(Style.BRIGHT + "Choose an option: " + Style.RESET_ALL) 
            print(Style.BRIGHT + "-" * 50)

            # Run something based on user input
            match choice:
                case "1":
                    input_new_subject()
                case "2":
                    log_session()
                case "3":
                    view_all_sessions()
                case "4":
                    view_total_time()
                case "5":
                    input_subject_to_remove()
                case "6":
                    stop()
                    break
                case _:
                    print("Invalid input")
    except KeyboardInterrupt:
        stop()

main()