from file_io import read_file, write_file, add_subject, remove_subject, click_to_cont

from math import floor
from colorama import init, Fore, Style
init(autoreset=True)

subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 1
# # ------------------------------------------------------------
# -------------------- View All Sessions ---------------------
# ------------------------------------------------------------
def conv_duration(duration):
    if duration < 60:
        time = str(duration) + " minutes"
    elif duration > 60:
        hours = str(floor(duration / 60))
        time = f"{hours} hour{'s' if hours != "1" else ''} " + str(duration % 60) + " minutes"
    elif duration == 60:
        time = "1 hour"
    else:
        time = "Invalid"
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


# 2
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

    for subject in totals:
        time = conv_duration(totals[subject])
        print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 

    click_to_cont()
