from base import all_sessions, total_time, get_weekly_stats, get_monthly_stats, convert_seconds
from cli_utils import get_time_string, click_to_cont, print_header
from colorama import init, Fore, Style
init(autoreset=True)

# --------------------------------------------------------------------
# View all sessions
def view_all_sessions():
    print_header("View all sessions", Fore.BLUE)
    data = all_sessions()

    if data:
        length = max(len(instance[0]) for instance in data) + 2
        for instance in data:
            subject, date, duration = instance
            time = get_time_string(duration)
            print(
                "📕 " + 
                Style.BRIGHT + Fore.RED + "Subject: " + 
                Style.RESET_ALL + f"{subject:<{length}}" + " | 📅 " + date + " | ⌚ " + time
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

# --------------------------------------------------------------------
# Weekly & Monthly stats
def weekly_stats():
    print_header("This week's stats")
    get_stats("weekly")

def monthly_stats():
    print_header("This month's stats")
    get_stats("monthly")

def get_stats(timeframe):
    if timeframe == "weekly": data = get_weekly_stats()
    else: data = get_monthly_stats()
    if data:
        for instance in data.items():
            subject, duration = instance
            time = get_time_string(convert_seconds(int(duration)))
            print("📗 " + Style.BRIGHT + Fore.GREEN + subject + ": " + Style.RESET_ALL + time) 
    else: 
        print(Style.BRIGHT + Fore.RED + "No sessions have been recorded! Use the sessions menu to get started.")
    click_to_cont()