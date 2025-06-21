from datetime import date
from file_io import read_file, write_file, add_subject, remove_subject
from colorama import init, Fore, Style
from math import floor

init(autoreset=True)
subjects = "data/subjects.json"
sessions = "data/sessions.json"

def click_to_cont():
    print(Style.BRIGHT + "-" * 50)
    print(Style.BRIGHT + Fore.BLACK + "Click any Enter to continue.")
    input()
    print()

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

    click_to_cont()

# 3
# ------------------------------------------------------------
# ---------------------- List Subjects -----------------------
# ------------------------------------------------------------
def list_subjects():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "YOUR SUBJECTS")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    subject_list = read_file(subjects)
    for subject in subject_list:
        print(subject)

    click_to_cont()