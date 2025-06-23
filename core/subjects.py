from utils import read_file, add_subject, remove_subject, click_to_cont, print_header, get_user_choice
from colorama import init, Fore, Style

init(autoreset=True)
subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 1
# ------------------------------------------------------------
# ------- Function for adding subject to subjects file -------
# ------------------------------------------------------------
def input_new_subject():
    print_header("Add new subject", Fore.BLUE)
    new_subject = get_user_choice("Subject Name: ")
    add_subject(new_subject)

# 2
# ------------------------------------------------------------
# ----- Function for removing subject from subjects file -----
# ------------------------------------------------------------
def input_subject_to_remove():
    print_header("Remove a subject", Fore.BLUE)
    removal_subject = get_user_choice("Subject Name: ")
    warning_res = get_user_choice(
        Fore.YELLOW + "⚠️ WARNING: " + 
        Style.NORMAL + "Are you sure you want to permanently remove this subject? This will delete any sessions associated with that subject. (y/n) "
    ).lower()

    if warning_res in ("y", "yes"):
        remove_subject(removal_subject)
        print(Style.BRIGHT + "-" * 50)
    elif warning_res in ("n", "no"):
        print(Style.BRIGHT + Fore.GREEN + "Stopping Removal" + "\n")
        print(Style.BRIGHT + "-" * 50)
        exit()

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