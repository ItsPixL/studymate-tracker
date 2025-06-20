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


# ------------------------------------------------------------
# ------- Function for adding subject to subjects file -------
# ------------------------------------------------------------
def add_subject():
    new_subject = input("Subject Name: ")
    data = read_file(subjects)
    if new_subject in data:
        print("Subject already in list. \n")
        exit
    else:
        data.append(new_subject)
    write_file(subjects, data)

# ------------------------------------------------------------
# ------ Function for logging sessions to sessions file ------
# ------------------------------------------------------------
def log_session():
    subject = input("Subject: ")
    duration = input("Duration: ")
    today = date.today().strftime("%Y-%m-%d")

    new_session = {
        "subject": subject,
        "date": today,
        "duration": duration,
    }

    data = read_file(sessions)
    data.append(new_session)
    write_file(sessions, data)
