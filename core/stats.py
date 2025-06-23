from base import all_sessions, total_time
from cli_utils import get_time_string

from utils import sessions_file, click_to_cont, read_file, conv_time_spent, print_header
from colorama import init, Fore, Style
init(autoreset=True)

# 1
# # ------------------------------------------------------------
# -------------------- View All Sessions ---------------------
# ------------------------------------------------------------
def view_all_sessions():
    print_header("View all sessions", Fore.BLUE)
    data = all_sessions()

    if data:
        for instance in data:
            subject, date, duration = instance
            time = get_time_string(duration)
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
    data = total_time()
    if data:
        for instance in data:
            subject, duration = instance
            time = get_time_string(duration)
            print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 
    else: 
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")
    click_to_cont()
