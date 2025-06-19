import json
file = "data/studymate.json"

# Function for adding subject to data file
def add_subject():
    new_subject = input("Subject Name: ")

    try:
        with open(file, 'r') as json_file:
            data = json.load(json_file)
    except FileNotFoundError:
        data = []
    
    data.append(new_subject)

    with open(file, 'w') as json_file:
        json.dump(data, json_file, indent=4)
