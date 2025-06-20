import json
from colorama import init, Fore, Style
init(autoreset=True)
subjects = "data/subjects.json"
sessions = "data/sessions.json"

# ------------------------------------------------------------
# ------------------------ Read File -------------------------
# ------------------------------------------------------------
def read_file(filename):
    try:
        with open(filename, 'r') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    return data


# ------------------------------------------------------------
# ---------------------- Write to File -----------------------
# ------------------------------------------------------------
def write_file(filename, data):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)


# ------------------------------------------------------------
# ----------------------- Add Subject ------------------------
# ------------------------------------------------------------
def add_subject(new_subject):
    data = read_file(subjects)
    if new_subject in data:
        print(Style.BRIGHT + Fore.YELLOW + "Subject already in list." + "\n")
        exit
    else:
        data.append(new_subject)
        write_file(subjects, data)
        print(Style.BRIGHT + Fore.GREEN + "Successfully added subject!" + "\n")
    
    print(Style.BRIGHT + "-" * 50)


# ------------------------------------------------------------
# ---------------------- Remove Subject ----------------------
# ------------------------------------------------------------
def remove_subject(subject):
    # Remove subject from subjects file
    data = read_file(subjects)
    if subject in data:
        data.remove(subject)
        write_file(subjects, data)
    else:
        print(Style.BRIGHT + Fore.RED + "Subject not found in list." + "\n")
        exit

    # Remove any sessions associated with that subject
    new_logs_data = []
    logs_data = read_file(sessions)
    for session in logs_data:
        if session["subject"] == subject:
            print(Style.BRIGHT + Fore.GREEN + "Removed log: " + session["subject"] + " on " + session["date"] + " for " + str(session["duration"]) + " minutes ")
        else:
            new_logs_data.append(session)
    write_file(sessions, new_logs_data)