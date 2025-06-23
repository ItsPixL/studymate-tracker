import json
from utils import read_file, write_file
from helpers import click_to_cont
from utils import subjects_file, sessions_file
from colorama import init, Fore, Style
init(autoreset=True)

# ------------------------------------------------------------
# ----------------------- Add Subject ------------------------
# ------------------------------------------------------------
def add_subject(new_subject):
    subjects_data = read_file(subjects_file)
    if new_subject in subjects_data:
        print(Style.BRIGHT + Fore.YELLOW + "Subject already in list." + "\n")
        exit()
    else:
        subjects_data.append(new_subject)
        write_file(subjects_file, subjects_data)
        print(Style.BRIGHT + Fore.GREEN + "Successfully added subject!" + "\n")
    
    print(Style.BRIGHT + "-" * 50)
    click_to_cont()


# ------------------------------------------------------------
# ---------------------- Remove Subject ----------------------
# ------------------------------------------------------------
def remove_subject(subject):
    # Remove subject from subjects file
    subjects_data = read_file(subjects_file)
    if subject in subjects_data:
        subjects_data.remove(subject)
        write_file(subjects_file, subjects_data)
    else:
        print(Style.BRIGHT + Fore.RED + "Subject not found in list." + "\n")
        exit()

    # Remove any sessions associated with that subject
    new_logs_data = []
    logs_data = read_file(sessions_file)
    for session in logs_data:
        if session["subject"] == subject:
            print(Style.BRIGHT + Fore.GREEN + "Removed log: " + session["subject"] + " on " + session["date"] + " for " + str(session["duration"]) + " minutes ")
        else:
            new_logs_data.append(session)
    write_file(sessions_file, new_logs_data)
    click_to_cont()