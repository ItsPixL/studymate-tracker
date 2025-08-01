from sys import path
from pathlib import Path
path.append(str(Path(__file__).resolve().parent))

from cli_utils import print_cli_menu, get_cli_input, print_divider
from cli_core import input_subject_to_add, input_subject_to_remove, print_subjects, log_session_input, timed_session_input, view_all_sessions, view_total_time, weekly_stats, monthly_stats, view_streaks
from base import read_file, SESSIONS

from colorama import init, Fore, Style
init(autoreset=True)

def stop():
    print(Style.BRIGHT + "Thanks for using" + Fore.CYAN + " StudyMate" +
          Fore.RESET + ". Your progress is saved: keep showing up, and the results will follow. "
                       "Until next time, stay focused and keep learning!\n")

# ------------------------------------------------------------
# ----------------------- Startup Menu -----------------------
# ------------------------------------------------------------
def main():
    print(Style.BRIGHT + "-" * 50)
    try:
        while True:
            print(Style.BRIGHT + "📚 Welcome to " + Fore.CYAN + "StudyMate")
            welcome_back()

            options = ["Edit subjects", "Log session", "Stats", "Exit"]
            print_cli_menu("Main Menu", options)

            choice = get_cli_input()
            print_divider()

            match choice:
                case "1": edit_subjects()
                case "2": sessions()
                case "3": stats()
                case "4":
                    stop()
                    break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()

# Check if user has been here before, if yes show streaks
def welcome_back():
    data = read_file(SESSIONS)
    if data != [] and data:
        view_streaks("no_click_to_cont")

# ------------------------------------------------------------
# ---------------------- Subjects Menu -----------------------
# ------------------------------------------------------------
def edit_subjects():
    try:
        while True:
            options = ["Add subject", "Remove subject", "List subjects", "Back"]
            print_cli_menu("Subjects", options)

            choice = get_cli_input()
            print_divider()

            match choice:
                case "1": input_subject_to_add()
                case "2": input_subject_to_remove()
                case "3": print_subjects()
                case "4": break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()
        exit()


# ------------------------------------------------------------
# ---------------------- Sessions Menu -----------------------
# ------------------------------------------------------------
def sessions():
    try:
        while True:
            options = ["Log session manually", "Start live session", "Back"]
            print_cli_menu("Log a Session", options)

            choice = get_cli_input()
            print_divider()

            match choice:
                case "1": log_session_input()
                case "2": live_session()
                case "3": break
                case _:
                    print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number"  + Style.RESET_ALL + "\n")

    except KeyboardInterrupt:
        stop()
        exit()

# ------------------------------------------------------------
# -------------------- Live Sessions Menu --------------------
# ------------------------------------------------------------
def live_session():
    options = ["Timer", "Stopwatch", "Pomodoro", "Back"]
    print_cli_menu("Start a live session", options)

    choice = get_cli_input()
    print_divider()

    match choice:
        case "1": timed_session_input("timer")
        case "2": timed_session_input("stopwatch") 
        case "3": timed_session_input("pomo")
        case "4": return
        case _:
            print("Invalid input")


# ------------------------------------------------------------
# ------------------------ Stats Menu ------------------------
# ------------------------------------------------------------
def stats():
    try:
        while True:
            options = ["View all sessions", "View total time", "Weekly stats", "Monthly stats", "Streaks", "Back"]
            print_cli_menu("Stats", options)

            choice = get_cli_input()
            print_divider()

            match choice:
                case "1": view_all_sessions()
                case "2": view_total_time()
                case "3": weekly_stats()
                case "4": monthly_stats()
                case "5": view_streaks()
                case "6": break
                case _:
                    print("Invalid input")

    except KeyboardInterrupt:
        stop()
        exit()

if __name__ == "__main__":
    main()