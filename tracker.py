import json
from datetime import date

subjects = "data/subjects.json"
sessions = "data/sessions.json"

# ------------------------------------------------------------
# ------------------- Universal Functions --------------------
# ------------------------------------------------------------

# Read File
def read_file(filename):
    try:
        with open(filename, 'r') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    return data

# Write to file
def write_file(filename, data):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Add Subject
def add_subject(new_subject):
    data = read_file(subjects)
    if new_subject in data:
        print("Subject already in list. \n")
        exit
    else:
        data.append(new_subject)
    write_file(subjects, data)
    print("\nSuccessfully added subject! \n")

# Remove Subject
def remove_subject(subject):
    # Remove subject from subjects file
    data = read_file(subjects)
    if subject in data:
        data.remove(subject)
        write_file(subjects, data)
    else:
        print("Subject not found in list. \n")
        exit

    # Remove any sessions associated with that subject
    new_logs_data = []
    logs_data = read_file(sessions)
    for session in logs_data:
        if session["subject"] == subject:
            print("Removed one log:", session)
        else:
            new_logs_data.append(session)
    write_file(sessions, new_logs_data)


# ------------------------------------------------------------
# ------- Function for adding subject to subjects file -------
# ------------------------------------------------------------
def input_new_subject():
    new_subject = input("Subject Name: ").strip()
    add_subject(new_subject)

# ------------------------------------------------------------
# ----- Function for removing subject from subjects file -----
# ------------------------------------------------------------
def input_subject_to_remove():
    removal_subject = input("Subject to remove: ").strip()
    warning_res = input("WARNING: Are you sure you want to permanently remove this subject? This will delete any sessions associated with that subject. (y/n) ").strip().lower()
    if warning_res in ("y", "yes"):
        remove_subject(removal_subject)
    elif warning_res in ("n", "no"):
        print("Stopping Removal\n")
        exit


# ------------------------------------------------------------
# ------ Function for logging sessions to sessions file ------
# ------------------------------------------------------------
def log_session():
    subject = input("Subject: ").strip()

    subjects_list = read_file(subjects)
    if subject not in subjects_list:
        choice = input("Subject not found! Would you like to add it to your subject's list? (y/n) ").strip().lower()
        if choice in ("y", "yes"):
            add_subject(subject)
        elif choice in ("n", "no"):
            print()
            return
        else:
            print("Invalid input \n")
            return

    while True:
        try:
            duration = int(input("Duration (minutes): "))
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print("Invalid input. Please enter a positive whole number \n")

    today = date.today().strftime("%Y-%m-%d")

    new_session = {
        "subject": subject,
        "date": today,
        "duration": duration,
    }

    data = read_file(sessions)
    data.append(new_session)
    write_file(sessions, data)
    print("\nSuccessfully logged session! \n")
