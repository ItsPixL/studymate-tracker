from datetime import date
from time import sleep
from utils import sessions_file, click_to_cont, conv_time_spent, read_file, write_file, check_subject, print_header, get_user_choice

from colorama import init, Fore, Style
init(autoreset=True)

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

    sessions_data = read_file(sessions_file)
    sessions_data.append(new_session)
    write_file(sessions_file, sessions_data)

    print(Style.BRIGHT + Fore.GREEN + "\nSuccessfully logged session!" + "\n")
    print(Style.BRIGHT + "-" * 50)

    click_to_cont()


# 1
# ------------------------------------------------------------
# ------ Function for user input to log session manually -----
# ------------------------------------------------------------
def log_session_input():
    print_header("Log a session")

    subject = input("Subject: ").strip()
    if check_subject(subject) == False:
        print(Style.BRIGHT + Fore.RED + "Session not logged!" + "\n")
        return

    while True:
        try:
            duration = int(get_user_choice("Duration (minutes): ")) * 60
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

def timer_input():
    subject = get_user_choice("Subject: ")
    if check_subject(subject) == False:
        print(Style.BRIGHT + Fore.RED + "Session not logged!" + "\n")
        return

    while True:
        try:
            duration = int(get_user_choice("\n" + Style.BRIGHT + "How long do you want to lock in for?" + Style.RESET_ALL + " (minutes): ")) * 60
            original_time = duration
            print()
            if duration <= 0:
                raise ValueError
            break
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter a positive whole number."  + Style.RESET_ALL + "\n")

    try:
        timer(duration, subject)
        
    except KeyboardInterrupt:
        print(Style.BRIGHT + Fore.RED + "Timer Paused!")
        pause_choice = get_user_choice("Would you like to continue (y) or cancel (n)").lower()
        timer_paused(pause_choice, duration, subject, original_time)

def timer(seconds, subject):
    remaining = seconds
    while remaining > 0:
        print(f"\r⏳ {conv_time_spent(remaining)}", end="")
        sleep(1)
        remaining -= 1

    log_session(subject, seconds)

def timer_paused(pause_choice, time_left, subject, original_time):
    try:
        if pause_choice in ("y", "yes"):
            timer(time_left, subject)
        elif pause_choice in ("n", "no"):
            timer_cancelled(subject, original_time, time_left)
        else:
            raise ValueError
    except ValueError:
        print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter 'y' or 'no'."  + Style.RESET_ALL + "\n")

def timer_cancelled(subject, original_time, duration):
    try:
        log_incomplete = get_user_choice(f"\n Would you like to log {conv_time_spent(original_time - duration)} (y) or discard this session (n)? ").lower()
        if log_incomplete in ("y", "yes"):
            log_session(subject, (original_time - duration))
        elif log_incomplete in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Session not logged")
            print()
            return
        else:
            raise ValueError
    except ValueError:
        print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter 'y' or 'no'."  + Style.RESET_ALL + "\n")



def stopwatch(): print() # TODO
def pomodoro(): print() # TODO