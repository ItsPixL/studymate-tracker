from datetime import date
from file_io import read_file, write_file, add_subject, remove_subject
from colorama import init, Fore, Style
init(autoreset=True)
subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 1
# ------------------------------------------------------------
# ------- Function for adding subject to subjects file -------
# ------------------------------------------------------------
def input_new_subject():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "ADD A SUBJECT")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    new_subject = input(Style.BRIGHT + "Subject Name: " + Style.RESET_ALL).strip()
    add_subject(new_subject)


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

    data = read_file(sessions)
    data.append(new_session)
    write_file(sessions, data)

    print(Style.BRIGHT + Fore.GREEN + "\nSuccessfully logged session!" + "\n")
    print(Style.BRIGHT + "-" * 50)


# 5
# ------------------------------------------------------------
# ----- Function for removing subject from subjects file -----
# ------------------------------------------------------------
def input_subject_to_remove():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "REMOVE A SUBJECT")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    removal_subject = input(Style.BRIGHT + "Subject Name: " + Style.RESET_ALL).strip()

    warning_res = input(Style.BRIGHT + Fore.YELLOW + "⚠️ WARNING: " + Style.NORMAL + "Are you sure you want to permanently remove this subject? This will delete any sessions associated with that subject. (y/n) " + Style.RESET_ALL).strip().lower()

    if warning_res in ("y", "yes"):
        remove_subject(removal_subject)
        print(Style.BRIGHT + "-" * 50)
    elif warning_res in ("n", "no"):
        print(Style.BRIGHT + Fore.GREEN + "Stopping Removal" + "\n")
        print(Style.BRIGHT + "-" * 50)
        exit

