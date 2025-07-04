from datetime import date, timedelta, datetime
from .sessions_base import all_sessions, total_time

# --------------------------------------------------------------------
# Get stats since a specified timeframe
def get_stats_from_timeframe(timeframe):
    sessions = all_sessions()
    if sessions:
        totals = {}

        for session in sessions:
            subject, session_date, duration = session
            hours, minutes, seconds = duration
            time = hours * 60 * 60 + minutes * 60 + seconds

            format_string = "%Y-%m-%d"
            datetime_object = datetime.strptime(session_date, format_string)

            if datetime_object.date() > timeframe:
                totals[subject] = totals.get(subject, 0) + time

        return totals
    
    else:
        return False

# Get Weekly Stats
def get_weekly_stats():
    today = date.today()
    seven_days_ago = today - timedelta(days=7)
    return get_stats_from_timeframe(seven_days_ago)

# Get Monthly Stats
def get_monthly_stats():
    today = date.today()
    one_month_ago = today - timedelta(days=30)
    return get_stats_from_timeframe(one_month_ago)

# --------------------------------------------------------------------
# Streaks
def calculate_streaks():
    sessions = all_sessions()
    if not sessions:
        return 0, 0

    dates = sorted({datetime.strptime(date, "%Y-%m-%d").date() for _, date, _ in sessions})
    
    if not dates:
        return 0, 0

    longest = 0
    streak = 1

    for i in range(1, len(dates)):
        if dates[i] == dates[i - 1] + timedelta(days=1):
            streak += 1
        else:
            longest = max(longest, streak)
            streak = 1

    longest = max(longest, streak)

    today = datetime.now().date()
    if dates[-1] in (today, today - timedelta(days=1)):
        current = streak
    else:
        current = 0

    return current, longest