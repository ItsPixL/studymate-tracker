import json
from datetime import date
import sys
from pathlib import Path

if getattr(sys, 'frozen', False):
    # Running as an exe → data/ is next to the exe
    PROJECT_ROOT = Path(sys.executable).resolve().parent
else:
    # Running via Python → data/ is one level up from backend/
    PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / 'data'
DATA_DIR.mkdir(parents=True, exist_ok=True)

SUBJECTS = DATA_DIR / 'subjects.json'
SESSIONS = DATA_DIR / 'sessions.json'

# --------------------------------------------------------------------
# Read File
def read_file(filename):
    try:
        with open(filename, 'r') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    return data


# --------------------------------------------------------------------
# Write to file
def write_file(filename, data):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)


# --------------------------------------------------------------------
# Add subject
def add_subject(new_subject):
    subjects_data = read_file(SUBJECTS)
    if new_subject in subjects_data:
        return False
    else:
        subjects_data.append(new_subject)
        write_file(SUBJECTS, subjects_data)
        return True


# --------------------------------------------------------------------
# Remove subject
def remove_subject(subject):
    remove_from_subjects_list(subject)
    remove_from_subjects_list(subject)

def remove_from_subjects_list(subject):
    subjects_data = read_file(SUBJECTS)
    if subject in subjects_data:
        subjects_data.remove(subject)
        write_file(SUBJECTS, subjects_data)
        return True
    else: return False

def remove_from_sessions_list(subject):
    sessions_removed = []
    new_sessions_data = []
    sessions_data = read_file(SESSIONS)
    for session in sessions_data:
        if session["subject"] == subject:
            sessions_removed.append(session)
        else: new_sessions_data.append(session)
    write_file(SESSIONS, new_sessions_data)
    return sessions_removed


# --------------------------------------------------------------------
# List Subjects
def list_subjects():
    subjects = []
    subject_list = read_file(SUBJECTS)
    for subject in subject_list:
        subjects.append(subject)
    return subjects


# --------------------------------------------------------------------
# Convert time (seconds) to hr/min/sec
def convert_seconds(time):
    hours, remainder = divmod(time, 3600)
    minutes, seconds = divmod(remainder, 60)

    return (hours, minutes, seconds)


# --------------------------------------------------------------------
# Check if subject is in list
def check_subject(subject):
    subjects_list = read_file(SUBJECTS)

    if subject not in subjects_list:
        return False
    else: 
        return True

# --------------------------------------------------------------------
# Log session
def log_session(subject, duration):
    today = date.today().strftime("%Y-%m-%d")

    new_session = {
        "subject": subject,
        "date": today,
        "duration": duration,
    }

    sessions_data = read_file(SESSIONS)
    sessions_data.append(new_session)
    write_file(SESSIONS, sessions_data)
    
    return True