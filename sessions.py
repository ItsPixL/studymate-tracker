from datetime import date
from file_io import read_file, write_file, add_subject, remove_subject, click_to_cont

from colorama import init, Fore, Style
init(autoreset=True)

subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 2
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
            duration = int(input(Style.BRIGHT + "Duration (minutes): " + Style.RESET_ALL))
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
