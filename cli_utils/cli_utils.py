from base import add_subject
from colorama import init, Fore, Style
init(autoreset=True)

# Print divider
def print_divider(color=Fore.WHITE):
    print(Style.BRIGHT + color + "-" * 50)

# Convert time tuple to string
def get_time_string(tuple):
    parts = []
    hours, minutes, seconds = tuple
    if hours:
        parts.append(f"{hours} hour{'s' if hours != 1 else ''}")
    if minutes:
        parts.append(f"{minutes} minute{'s' if minutes != 1 else ''}")
    if seconds or not parts:
        parts.append(f"{seconds} second{'s' if seconds != 1 else ''}")

    return ' '.join(parts)

# Click Enter to Continue
def click_to_cont():
    print(Style.BRIGHT + "-" * 50)
    print(Style.BRIGHT + Fore.BLACK + "Click Enter to continue.")
    input()
    print()

# Print Header
def print_header(title, color=Fore.RED):
    print(Style.BRIGHT + color + "-" * 30)
    print(Style.BRIGHT + color + title.upper())
    print(Style.BRIGHT + color + "-" * 30)

# Print CLI Menu
def print_cli_menu(title, options):
    print()
    print_header(title)

    for i, option in enumerate(options, 1):
        print(Fore.YELLOW + f"{i}. " + Style.RESET_ALL + option)

# Reusable Input Handler
def get_cli_input(prompt="Choose an option: "):
    return input("\n" + Style.BRIGHT + prompt + Style.RESET_ALL).strip()

# Reusable Positive Number Input Handler
def get_positive_int(prompt="Enter an integer: "):
    while True:
        try:
            integer = int(get_cli_input(prompt))
            if integer <= 0:
                raise ValueError
            return integer
        except ValueError:
            return False

# Ask to add subject
def ask_to_add_subject(subject):
    res = y_or_n_input(
        f"Would you like to add {subject} to your list (y/n)? ", 
        lambda: add_subject(subject), 
    )
    return res

# Y or N input
def y_or_n_input(input_msg, yes_action=None, no_action=None):
    while True:
        try:
            res = get_cli_input(input_msg).lower()
            if res in ("y", "yes"):
                if callable(yes_action): yes_action()
                return True
            elif res in ("n", "no"):
                if callable(no_action): no_action()
                return False
            else:
                raise ValueError
        except ValueError:
            print(Style.BRIGHT + Fore.RED + "Invalid input. Please enter 'y' or 'n'."  + Style.RESET_ALL + "\n")