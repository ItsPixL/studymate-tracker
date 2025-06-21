from datetime import date
from time import sleep
from file_io import read_file, write_file, add_subject, remove_subject, click_to_cont

from colorama import init, Fore, Style
init(autoreset=True)

subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 1
# ------------------------------------------------------------
# ------ Function for logging sessions to sessions file ------
# ------------------------------------------------------------
def log_session():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "LOG A SESSION")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    subject = input("Subject: ").strip()

    subjects_list = read_file(subjects)
    if subject not in subjects_list:
        choice = input(Style.BRIGHT + "Subject not found! Would you like to add it to your subject's list? (y/n) " + Style.RESET_ALL).strip().lower()
        if choice in ("y", "yes"):
            add_subject(subject)
        elif choice in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Subject not added")
            print()
            return
        else:
            print(Style.BRIGHT + Fore.RED + "Invalid input" + "\n")
            return

    while True:
        try:
            duration = int(input(Style.BRIGHT + "Duration (minutes): " + Style.RESET_ALL).strip())
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number"  + Style.RESET_ALL + "\n")

    today = date.today().strftime("%Y-%m-%d")

    new_session = {
        "subject": subject,
        "date": today,
        "duration": duration,
    }

    sessions_data = read_file(sessions)
    sessions_data.append(new_session)
    write_file(sessions, sessions_data)

    print(Style.BRIGHT + Fore.GREEN + "\nSuccessfully logged session!" + "\n")
    print(Style.BRIGHT + "-" * 50)

    click_to_cont()

# 2
# ------------------------------------------------------------
# ----------- Function for the live timer logging ------------
# ------------------------------------------------------------
def live_session():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "START A LIVE SESSION")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    print(Style.BRIGHT + Fore.CYAN + "Select a Mode")
    list = ["Timer", "Stopwatch", "Pomodoro", "Back"]
    for item in list:
        print(Fore.YELLOW + f"{list.index(item) + 1}. " + Style.RESET_ALL + item)

    choice = input("\n" + Style.BRIGHT + "Choose an option: " + Style.RESET_ALL).strip()
    print(Style.BRIGHT + "-" * 50)

    match choice:
        case "1": timer()
        case "2": stopwatch()
        case "3": pomodoro()
        case "4": exit()
        case _:
            print("Invalid input")

def timer():
    while True:
        try:
            duration = int(input("\n" + Style.BRIGHT + "How long do you want to lock in for?" + Style.RESET_ALL + " (minutes): ").strip()) * 60
            print()
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number"  + Style.RESET_ALL + "\n")

    while duration >= 0:
        try:
            print(Style.BRIGHT, Fore.YELLOW, duration, "\r", end="")
            duration -= 1
            sleep(1)
        except KeyboardInterrupt:
            duration = 0
            print("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")   
            exit()

def stopwatch(): print() # TODO
def pomodoro(): print() # TODO