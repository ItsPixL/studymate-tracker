from datetime import date
from file_io import read_file, write_file, add_subject, remove_subject
subjects = "data/subjects.json"
sessions = "data/sessions.json"

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
