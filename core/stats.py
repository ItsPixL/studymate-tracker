from utils import sessions_file, click_to_cont, read_file, conv_time_spent, print_header
from colorama import init, Fore, Style
init(autoreset=True)

# 1
# # ------------------------------------------------------------
# -------------------- View All Sessions ---------------------
# ------------------------------------------------------------
def view_all_sessions():
    print_header("View all sessions", Fore.BLUE)

    sessions_data = read_file(sessions_file)
    if sessions_data:
        for session in sessions_data:
            subject = session["subject"]
            date = session["date"]
            duration = session["duration"]
            time = conv_time_spent(duration)

            print(
                "📕 " + 
                Style.BRIGHT + Fore.RED + "Subject: " + 
                Style.RESET_ALL + f"{subject:12}" + " | 📅 " + date + " | ⌚ " + time
            )
    
    else:
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")
    
    click_to_cont()


# 2
# ------------------------------------------------------------
# --------------------- View Total Time ----------------------
# ------------------------------------------------------------
def view_total_time():
    print_header("View total study time", Fore.BLUE)

    sessions_data = read_file(sessions_file)
    if sessions_data:
        totals = {}
        for session in sessions_data:
            subject = session["subject"]
            totals[subject] = totals.get(subject, 0) + session["duration"]

        for subject, total in totals.items():
            time = conv_time_spent(total)
            print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 

    else:
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")

    click_to_cont()
