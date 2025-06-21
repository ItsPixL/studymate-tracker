from subjects import input_new_subject, input_subject_to_remove, list_subjects
from sessions import log_session, live_session
from stats import view_all_sessions, view_total_time

from colorama import init, Fore, Style
init(autoreset=True)

def stop(): print("\n" + Style.BRIGHT + "Thanks for using" + Fore.CYAN + " StudyMate " + Fore.RESET + "Your progress is saved: keep showing up, and the results will follow. Until next time, stay focused and keep learning!" + "\n")

# ------------------------------------------------------------
# ----------------------- Startup Menu -----------------------
# ------------------------------------------------------------
def main():
    print(Style.BRIGHT + "-" * 50)
    try:
        while True:
            # Print options
            print(Style.BRIGHT + "📚 Welcome to " + Fore.CYAN + "StudyMate" + "\n")
            list = ["Edit subjects", "Log session", "Stats", "Exit"]
            for item in list:
                 print(Fore.YELLOW + f"{list.index(item) + 1}. " + Style.RESET_ALL + item)

            # Get user input
            choice = input("\n" + Style.BRIGHT + "Choose an option: " + Style.RESET_ALL).strip()
            print(Style.BRIGHT + "-" * 50)

            # Run something based on user input
            match choice:
                case "1": edit_subjects()
                case "2": sessions()
                case "3": stats()
                case "4":
                    stop()
                    break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()

# ------------------------------------------------------------
# ---------------------- Subjects Menu -----------------------
# ------------------------------------------------------------
def edit_subjects():
    try:
        while True:
            # Print options
            print()
            print(Style.BRIGHT + Fore.RED + "-" * 30)
            print(Style.BRIGHT + Fore.RED + "SESSIONS")
            print(Style.BRIGHT + Fore.RED + "-" * 30)

            list = ["Add subject", "Remove subject", "List Subjects", "Back"]
            for item in list:
                print(Fore.YELLOW + f"{list.index(item) + 1}. " + Style.RESET_ALL + item)

            # Get user input
            choice = input("\n" + Style.BRIGHT + "Choose an option: " + Style.RESET_ALL).strip()
            print(Style.BRIGHT + "-" * 50)

            # Run something based on user input
            match choice:
                case "1": input_new_subject()
                case "2": input_subject_to_remove()
                case "3": list_subjects()
                case "4": break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()
        exit()


# ------------------------------------------------------------
# ---------------------- Sessions Menu -----------------------
# ------------------------------------------------------------
def sessions():
    try:
        while True:
            # Print options
            print()
            print(Style.BRIGHT + Fore.RED + "-" * 30)
            print(Style.BRIGHT + Fore.RED + "LOG A SESSION")
            print(Style.BRIGHT + Fore.RED + "-" * 30)

            list = ["Log session", "Start a timer", "Back"]
            for item in list:
                print(Fore.YELLOW + f"{list.index(item) + 1}. " + Style.RESET_ALL + item)

            # Get user input
            choice = input("\n" + Style.BRIGHT + "Choose an option: " + Style.RESET_ALL).strip()
            print(Style.BRIGHT + "-" * 50)

            # Run something based on user input
            match choice:
                case "1": log_session()
                case "2": live_session()
                case "3": break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()
        exit()


# ------------------------------------------------------------
# ------------------------ Stats Menu ------------------------
# ------------------------------------------------------------
def stats():
    try:
        while True:
            # Print options
            print(Style.BRIGHT + Fore.RED + "-" * 30)
            print(Style.BRIGHT + Fore.RED + "STATS")
            print(Style.BRIGHT + Fore.RED + "-" * 30)

            list = ["View all sessions", "View total time", "Weekly stats", "Monthly stats", "Back"]
            for item in list:
                print(Fore.YELLOW + f"{list.index(item) + 1}. " + Style.RESET_ALL + item)

            # Get user input
            choice = input(Style.BRIGHT + "Choose an option: " + Style.RESET_ALL).strip()
            print(Style.BRIGHT + "-" * 50)

            # Run something based on user input
            match choice:
                case "1": view_all_sessions()
                case "2": view_total_time()
                case "3": print("") # TODO
                case "4": print("") # TODO
                case "5": break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()
        exit()

main()