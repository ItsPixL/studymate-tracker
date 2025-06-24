from time import sleep
from base import log_session, check_if_subject_exists, convert_seconds
from cli_utils import print_header, get_cli_input, get_positive_int, click_to_cont, ask_to_add_subject, y_or_n_input, get_time_string

from colorama import init, Fore, Style
init(autoreset=True)

# --------------------------------------------------------------------
# Log session
def log_session_input():
    print_header("Manually log a session")
    subject = get_cli_input("Subject: ")

    while True:
        if check_if_subject_exists(subject):
            duration = get_positive_int("Duration (minutes): ")
            if log_session(subject, duration):
                print(Style.BRIGHT + Fore.GREEN + "Session logged successfully!\n")
            click_to_cont()
            break
        else:
            if not ask_to_add_subject(subject):
                print(Style.BRIGHT + Fore.RED + "Session not logged!\n")
                click_to_cont()
                break


# --------------------------------------------------------------------
# Live Timer Logging
def timer_input():
    subject = get_cli_input("Subject: ")
    while True:
        if check_if_subject_exists(subject): break
        else:
            print(Style.BRIGHT + Fore.RED + "Subject does not exist!" + "\n")
            if not ask_to_add_subject(subject):
                print(Style.BRIGHT + Fore.RED + "Session not logged!\n")
                click_to_cont()
                return

    duration = get_positive_int("\n" + Style.BRIGHT + "How long do you want to lock in for?" + Style.RESET_ALL + " (minutes): ") * 60
    original_time = duration

    try:
        timer(subject, duration)
    except KeyboardInterrupt:
        print(Style.BRIGHT + Fore.RED + "Timer Paused!")
        timer_paused(duration, subject, original_time)

def timer(subject, seconds):
    remaining = seconds
    while remaining > 0:
        print(" ", get_time_string(convert_seconds(remaining)), "\r", end="")
        sleep(1)
        remaining -= 1

    log_session(subject, seconds)

def timer_paused(time_left, subject, original_time):
    y_or_n_input(
        "Would you like to continue (y) or cancel (n)? ", 
        lambda: timer(time_left, subject),
        timer_cancelled(subject, original_time, time_left),
    )

def timer_cancelled(subject, original_time, duration):
    y_or_n_input(
        f"\n Would you like to log {convert_seconds(original_time - duration)} (y) or discard this session (n)? ",
        log_session(subject, (original_time - duration)),
        print(Style.BRIGHT + Fore.RED + "Session not logged" + "\n")
    )

def stopwatch_input(): print() # TODO
def pomodoro_input(): print() # TODO