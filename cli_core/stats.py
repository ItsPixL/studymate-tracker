from base import all_sessions, total_time
from cli_utils import get_time_string, click_to_cont, print_header
from colorama import init, Fore, Style
init(autoreset=True)

# --------------------------------------------------------------------
# View all sessions
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


# --------------------------------------------------------------------
# View total time
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
