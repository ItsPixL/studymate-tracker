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
# Input for timed session
def timed_session_input(type):
    subject = get_cli_input("Subject: ")
    while True:
        if check_if_subject_exists(subject): break
        else:
            print(Style.BRIGHT + Fore.RED + "Subject does not exist!\n")
            if not ask_to_add_subject(subject):
                print(Style.BRIGHT + Fore.RED + "Session not logged!\n")
                click_to_cont()
                return

    if type == "timer":
        duration = get_positive_int(Style.BRIGHT + "How long do you want to lock in for?" + Style.RESET_ALL + " (minutes): ") * 60
        timer(subject, duration)
    elif type == "stopwatch":
        stopwatch(subject)
    elif type == "pomo":
        pomodoro()
        
# --------------------------------------------------------------------
# Timer
def timer(subject, seconds):
    remaining = seconds
    try:
        print("Click Ctrl+C or Cmd+C to pause the timer" + "\n")
        while remaining > 0:
            print(" Time left: " + Fore.CYAN + get_time_string(convert_seconds(remaining)), "\r", end="")
            sleep(1)
            remaining -= 1
    except KeyboardInterrupt:
        sleep(0.1)
        print("\n" * 2 + Style.BRIGHT + Fore.YELLOW + f"Timer Paused with {get_time_string(convert_seconds(remaining))} left.")
        timer_paused(remaining, subject, seconds)

    log_session(subject, seconds)

def timer_paused(time_left, subject, original_time):
    elapsed_time = original_time - time_left
    res = y_or_n_input(
        "Would you like to continue (y) or cancel (n)? ", 
        lambda: timer(subject, time_left),
        lambda: timer_cancelled(subject, elapsed_time),
    )

def timer_cancelled(subject, elapsed_time):
    def on_yes():
        if log_session(subject, (elapsed_time)):
            print(Style.BRIGHT + Fore.GREEN + "Session logged successfully!")
        else:
            print(Style.BRIGHT + Fore.RED + "Session log failed!")
        click_to_cont()

    def on_no():
        print(Style.BRIGHT + Fore.RED + "Session not logged" + "\n")
        click_to_cont()

    y_or_n_input(
        f"\nWould you like to log {Fore.GREEN + get_time_string(convert_seconds(elapsed_time)) + Fore.MAGENTA} (y) or discard this session (n)? ",
        lambda: on_yes(),
        lambda: on_no(),
    )

# --------------------------------------------------------------------
# Stopwatch
def stopwatch(subject, starting_duration=0): 
    elapsed_time = starting_duration
    try: 
        print("Click Ctrl+C or Cmd+C to pause the stopwatch", "\n")
        while True:
            print(" Elapsed time: " + Fore.CYAN + get_time_string(convert_seconds(elapsed_time)) + "\r", end="")
            sleep(1)
            elapsed_time += 1
    except KeyboardInterrupt:
        sleep(0.1)
        print("\n" * 2 + Style.BRIGHT + Fore.YELLOW + f"Stopwatch paused at {get_time_string(convert_seconds(elapsed_time))} left.")
        stopwatch_paused(subject, elapsed_time)

def stopwatch_paused(subject, elapsed_time):
    res = y_or_n_input(
        "Would you like to continue (y) or cancel (n)? ", 
        lambda: stopwatch(subject, elapsed_time),
        lambda: timer_cancelled(subject, elapsed_time),
    )

def pomodoro(): print() # TODO