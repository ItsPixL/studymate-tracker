from file_io import add_subject
from utils import read_file, subjects_file
from colorama import Fore, Style

def check_subject(subject):
    subjects_list = read_file(subjects_file)
    if subject not in subjects_list:
        choice = input(Style.BRIGHT + "Subject not found! Would you like to add it to your subject's list? (y/n) " + Style.RESET_ALL).strip().lower()
        if choice in ("y", "yes"):
            add_subject(subject)
            return True
        elif choice in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Subject not added")
            return False
        else:
            print(Style.BRIGHT + Fore.RED + "Invalid input")
            return False
    return True
