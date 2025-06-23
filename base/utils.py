import json

# Variables
SUBJECTS = "data/subjects.json"
SESSIONS = "data/sessions.json"

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

# Convert time (seconds) to hr/min/sec
def convert_seconds(time):
    hours, remainder = divmod(time, 3600)
    minutes, seconds = divmod(remainder, 60)

    return (hours, minutes, seconds)

# Check if subject is in list
def check_subject(subject):
    subjects_list = read_file(SUBJECTS)

    if subject not in subjects_list:
        return False
    else: 
        return True
