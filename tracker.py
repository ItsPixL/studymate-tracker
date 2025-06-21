from datetime import date
from file_io import read_file, write_file, add_subject, remove_subject
from colorama import init, Fore, Style
from math import floor

init(autoreset=True)
subjects = "data/subjects.json"
sessions = "data/sessions.json"

def click_to_cont():
    print(Style.BRIGHT + "-" * 50)
    print(Style.BRIGHT + Fore.BLACK + "Click any Enter to continue.")
    input()
    print()

# 2
# ------------------------------------------------------------
# ------ Function for logging sessions to sessions file ------
# ------------------------------------------------------------
def log_session():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "LOG A SESSION")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    subject = input("Subject: ").strip()

    subjects_list = read_file(subjects)
    if subject not in subjects_list:
        choice = input(Style.BRIGHT + "Subject not found! Would you like to add it to your subject's list? (y/n) " + Style.RESET_ALL).strip().lower()
        if choice in ("y", "yes"):
            add_subject(subject)
        elif choice in ("n", "no"):
            print()
            return
        else:
            print(Style.BRIGHT + Fore.RED + "Invalid input" + "\n")
            return

    while True:
        try:
            duration = int(input(Style.BRIGHT + "Duration (minutes): " + Style.RESET_ALL))
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number"  + Style.RESET_ALL + "\n")

    today = date.today().strftime("%Y-%m-%d")

    new_session = {
        "subject": subject,
        "date": today,
        "duration": duration,
    }

    sessions_data = read_file(sessions)
    sessions_data.append(new_session)
    write_file(sessions, sessions_data)

    print(Style.BRIGHT + Fore.GREEN + "\nSuccessfully logged session!" + "\n")
    print(Style.BRIGHT + "-" * 50)

    click_to_cont()


# 3
# ------------------------------------------------------------
# -------------------- View All Sessions ---------------------
# ------------------------------------------------------------
def conv_duration(duration):
    if duration < 60:
        time = str(duration) + " minutes"
    elif duration > 60:
        hours = str(floor(duration / 60))
        time = f"{hours} hour{'s' if hours != "1" else ''} " + str(duration % 60) + " minutes"
    return time

def view_all_sessions():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "VIEW ALL SESSIONS")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    sessions_data = read_file(sessions)
    for session in sessions_data:
        subject = session["subject"]
        date = session["date"]
        duration = session["duration"]
        time = conv_duration(duration)
        print("📕 " + Style.BRIGHT + Fore.RED + "Subject: " + Style.RESET_ALL + f"{subject:12}" + " | 📅 " + date + " | ⌚ " + time)
    
    click_to_cont()


# 4
# ------------------------------------------------------------
# --------------------- View Total Time ----------------------
# ------------------------------------------------------------
def view_total_time():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "VIEW TOTAL STUDY TIME")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    sessions_data = read_file(sessions)
    totals = {}
    for session in sessions_data:
        subject = session["subject"]
        totals[subject] = totals.get(subject, 0) + session["duration"]

    for subject  in totals:
        time = conv_duration(totals[subject])
        print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 

    click_to_cont()
