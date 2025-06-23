from colorama import init, Fore, Style
init(autoreset=True)

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

    return ''.join(parts)

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