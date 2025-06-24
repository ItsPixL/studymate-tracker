from base import add_subject, remove_subject, list_subjects
from cli_utils import print_divider, print_header, get_cli_input, click_to_cont
from colorama import init, Fore, Style
init(autoreset=True)

# --------------------------------------------------------------------
# Add subject to subjects file
def input_subject_to_add():
    print_header("Add new subject")
    new_subject = get_cli_input("Subject Name: ")
    if new_subject:
        res = add_subject(new_subject)
        if res == True:
            print(f"{new_subject} added successfully!")
        else:
            print(f"{new_subject} is already in your list.")
    else:
        print("Subject cannot be blank.")
    click_to_cont()
    

# --------------------------------------------------------------------
# Remove subject from subjects file and sessions file
def input_subject_to_remove():
    try:
        print_header("Remove a subject")
        removal_subject = get_cli_input("Subject Name: ")
        warning_res = get_cli_input((
            Fore.YELLOW + "⚠️ WARNING: " + 
            Style.NORMAL + "Are you sure you want to permanently remove this subject? This will delete any sessions associated with that subject. (y/n) "
        )).lower()

        if warning_res in ("y", "yes"):
            remove_subject(removal_subject)
            print_divider()
        elif warning_res in ("n", "no"):
            print(Style.BRIGHT + Fore.GREEN + "Stopping Removal" + "\n")
            print_divider()
            return
        else: raise ValueError
    except ValueError:
            print("Invalid input. Please enter 'y' or 'no'.")


# --------------------------------------------------------------------
# List Subjects
def print_subjects():
    print_header("Your subjects")
    subjects = list_subjects()
    for subject in subjects:
        print(f"📕 {subject}")
    click_to_cont()