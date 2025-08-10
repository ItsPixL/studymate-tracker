from flask import Flask, request, jsonify
from flask_cors import CORS
from base import list_subjects, calculate_streaks, get_weekly_stats, get_monthly_stats, add_subject, remove_subject, convert_seconds, log_session, check_if_subject_exists

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)

# List subjects
@app.route("/api/subjects", methods=["GET"])
def api_get_subjects():
    subjects = list_subjects()
    return jsonify(subjects)

# Get streaks
@app.route("/api/streaks", methods=["GET"])
def api_get_streaks():
    current, longest = calculate_streaks()
    return jsonify(current, longest)

# Weekly stats
@app.route("/api/weekly", methods=["GET"])
def api_get_weekly():
    stats = get_weekly_stats()
    if stats:
        return jsonify(stats)
    else:
        return jsonify([])

# Monthly stats
@app.route("/api/monthly", methods=["GET"])
def api_get_monthly():
    stats = get_monthly_stats()
    if stats:
        return jsonify(stats)
    else:
        return jsonify([])

# Add subject
@app.route("/api/addSubject", methods=["POST"])
def api_add_subject():
    subject = request.get_json().get("subject")
    add_subject(subject)
    return jsonify({"message": "Received!"})

# Remove subject
@app.route("/api/removeSubject", methods=["POST"])
def api_remove_subject():
    subject = request.get_json().get("subject")
    remove_subject(subject)
    return jsonify({"message": "Received"})

# Check if subject in list
@app.route("/api/checkSubject", methods=["POST"])
def api_check_subject():
    subject = request.get_json().get("subject")
    res = check_if_subject_exists(subject)
    return jsonify({"res": res})

# Log session
@app.route("/api/logSession", methods=["POST"])
def api_log_session():
    subject = request.get_json().get("subject")
    duration = request.get_json().get("duration")
    log_session(subject, duration)

    h, m, s = convert_seconds(duration)

    parts = []
    if h: parts.append(f"{h} hour{'s' if h != 1 else ''}")
    if m: parts.append(f"{m} minutes{'s' if m != 1 else ''}")
    if s: parts.append(f"{s} second{s if s != 1 else ''}")
    formatted_time = ", ".join(parts) if parts else "0 seconds"

    return jsonify({"message": f"Logged {subject} for {formatted_time}!"})

if __name__ == "__main__":
    app.run()