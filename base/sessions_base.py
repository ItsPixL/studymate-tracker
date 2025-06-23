from .utils import SESSIONS, read_file, convert_seconds

# List all sessions
def all_sessions():
    sessions_data = read_file(SESSIONS)
    if sessions_data:
        data = []
        for session in sessions_data:
            data.append((session["subject"], session["date"], convert_seconds(session["duration"])))
        return data
    
    else: return False
    
# List total time
def total_time():
    sessions_data = read_file(SESSIONS)
    if sessions_data:
        totals = {}
        data = []
        for session in sessions_data:
            subject = session["subject"]
            totals[subject] = totals.get(subject, 0) + session["duration"]

        for subject, total in totals.items():
            time = convert_seconds(total)
            data.append((subject, time))

        return data
        
    else: return False