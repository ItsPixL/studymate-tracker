from .utils import SUBJECTS, read_file

def check_if_subject_exists(subject):
    subjects_list = read_file(SUBJECTS)
    if subject not in subjects_list: return False
    else: return True