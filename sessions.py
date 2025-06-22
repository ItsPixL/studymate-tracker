from datetime import date
from time import sleep
from file_io import read_file, write_file, add_subject, remove_subject, click_to_cont

from colorama import init, Fore, Style
init(autoreset=True)

subjects = "data/subjects.json"
sessions = "data/sessions.json"

def check_subject(subject):
    subjects_list = read_file(subjects)
    if subject not in subjects_list:
        choice = input(Style.BRIGHT + "Subject not found! Would you like to add it to your subject's list? (y/n) " + Style.RESET_ALL).strip().lower()
        if choice in ("y", "yes"):
            add_subject(subject)
            return True
        elif choice in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Subject not added")
            return False
        else:
            print(Style.BRIGHT + Fore.RED + "Invalid input")

# ------------------------------------------------------------
# ------ Function for logging sessions to sessions file ------
# ------------------------------------------------------------
def log_session(subject, duration):
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


# 1
# ------------------------------------------------------------
# ------ Function for user input to log session manually -----
# ------------------------------------------------------------
def log_session_input():
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)
    print(Style.BRIGHT + Fore.BLUE + "LOG A SESSION")
    print(Style.BRIGHT + Fore.BLUE + "-" * 30)


    subject = input("Subject: ").strip()
    if check_subject(subject) == False:
        print(Style.BRIGHT + Fore.RED + "Session not logged!" + "\n")
        return

    while True:
        try:
            duration = int(input(Style.BRIGHT + "Duration (minutes): " + Style.RESET_ALL).strip()) * 60
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number."  + Style.RESET_ALL + "\n")

    log_session(subject, duration)

# 2
# ------------------------------------------------------------
# ----------- Function for the live timer logging ------------
# ------------------------------------------------------------
def conv_time_spent(duration):
    parts = []
    hours, remainder = divmod(duration, 3600)
    minutes, seconds = divmod(remainder, 60)

    if hours:
        parts.append(f"{hours} hour{'s' if hours != 1 else ''}")
    if minutes:
        parts.append(f"{minutes} minute{'s' if minutes != 1 else ''}")
    if seconds or not parts:
        parts.append(f"{seconds} second{'s' if seconds != 1 else ''}")

    return ' '.join(parts)


def timer():
    subject = input("Subject: ").strip()
    if check_subject(subject) == False:
        print(Style.BRIGHT + Fore.RED + "Session not logged!" + "\n")
        return

    while True:
        try:
            duration = int(input("\n" + Style.BRIGHT + "How long do you want to lock in for?" + Style.RESET_ALL + " (minutes): ").strip()) * 60
            original_time = duration
            print()
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number."  + Style.RESET_ALL + "\n")

    try:
        while duration >= 0:
            print(Style.BRIGHT, Fore.YELLOW, f" {conv_time_spent(duration)}", "\r", end="")
            duration -= 1
            sleep(1)

        log_session(subject, duration)
        
    except KeyboardInterrupt:
        log_incomplete = input(f"\n Would you like to log {conv_time_spent(original_time - duration)} (y) or discard this session (n)? ").strip().lower()
        if log_incomplete in ("y", "yes"):
            log_session(subject, (original_time - duration) // 60)
        elif log_incomplete in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Session not logged")
            print()
            return
        exit()

    # TODO:
    # - Timer shows hours, minutes, seconds (instead of just seconds)

def stopwatch(): print() # TODO
def pomodoro(): print() # TODO