import json

def tracker():
    print(1)

def add_subject():
    subject = input("Subject Name: ")
    data = {"subject": subject, "time": 0}
    with open('studymate.json', 'a') as json_file:
        json.dump(data, json_file, indent=4)
