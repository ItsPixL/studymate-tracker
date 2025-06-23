from colorama import init, Fore, Style
init(autoreset=True)

# Click Enter to Continue
def click_to_cont():
    print(Style.BRIGHT + "-" * 50)
    print(Style.BRIGHT + Fore.BLACK + "Click Enter to continue.")
    input()
    print()

# Print Header
def print_header(title):
    print(Style.BRIGHT + Fore.RED + "-" * 30)
    print(Style.BRIGHT + Fore.RED + title.upper())
    print(Style.BRIGHT + Fore.RED + "-" * 30)

# Print Menu
def print_menu(title, options):
    print()
    print_header(title)

    for i, option in enumerate(options, 1):
        print(Fore.YELLOW + f"{i}. " + Style.RESET_ALL + option)

# Reusable Input Handler
def get_user_choice(prompt="Choose an option: "):
    return input("\n" + Style.BRIGHT + prompt + Style.RESET_ALL).strip()
