from datetime import date
from time import sleep
from utils import sessions_file, click_to_cont, conv_time_spent, read_file, write_file, check_subject

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
            log_session(subject, (original_time - duration))
        elif log_incomplete in ("n", "no"):
            print(Style.BRIGHT + Fore.RED + "Session not logged")
            print()
            return
        exit()

    # TODO:
    # - Timer shows hours, minutes, seconds (instead of just seconds)

def stopwatch(): print() # TODO
def pomodoro(): print() # TODO