from file_io import read_file, write_file, add_subject, remove_subject, click_to_cont
from sessions import conv_time_spent
from colorama import init, Fore, Style
init(autoreset=True)

subjects = "data/subjects.json"
sessions = "data/sessions.json"

# 1
# # ------------------------------------------------------------
# -------------------- View All Sessions ---------------------
# ------------------------------------------------------------
def view_all_sessions():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "VIEW ALL SESSIONS")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)

    sessions_data = read_file(sessions)
    if sessions_data:
        for session in sessions_data:
            subject = session["subject"]
            date = session["date"]
            duration = session["duration"]
            time = conv_time_spent(duration)

            print("📕 " + Style.BRIGHT + Fore.RED + "Subject: " + Style.RESET_ALL + f"{subject:12}" + " | 📅 " + date + " | ⌚ " + time)
    
    else:
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")
    
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
    if sessions_data:
        totals = {}
        for session in sessions_data:
            subject = session["subject"]
            totals[subject] = totals.get(subject, 0) + session["duration"]

        for subject in totals:
            time = conv_time_spent(totals[subject])
            print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 

    else:
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")

    click_to_cont()
