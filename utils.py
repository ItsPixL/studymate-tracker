import json

# Variables
subjects_file = "data/subjects.json"
sessions_file = "data/sessions.json"

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

# Convert time spent (seconds) to hr/min/sec
def conv_time_spent(duration):
    parts = []
    hours, remainder = divmod(duration, 3600)
    minutes, seconds = divmod(remainder, 60)

    if hours:
        parts.append(f"{hours} hour{'s' if hours != 1 else ''}")
    if minutes:
        parts.append(f"{minutes} minute{'s' if minutes != 1 else ''}")
    if seconds or not parts:
        parts.append(f"{seconds} second{'s' if seconds != 1 else ''}")

    return ' '.join(parts)