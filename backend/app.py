from flask import Flask, request, jsonify, send_from_directory # type: ignore
from flask_cors import CORS # type: ignore
import os
import sys
import webbrowser

# Import your backend logic
from base import (
    list_subjects, calculate_streaks, get_weekly_stats, get_monthly_stats,
    add_subject, remove_subject, convert_seconds, log_session, check_if_subject_exists
)

# Path to the React dist directory
if getattr(sys, 'frozen', False):
    # exe → frontend/dist inside the same folder as the exe
    PROJECT_ROOT = os.path.dirname(sys.executable)
    frontend_dir = os.path.join(PROJECT_ROOT, "frontend/dist")
else:
    # dev → relative to backend folder
    PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.abspath(os.path.join(PROJECT_ROOT, "../frontend/studymate-frontend/dist"))

app = Flask(__name__, static_folder=frontend_dir, static_url_path="")
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8000", "http://127.0.0.1:8000"]}})


# ---------- API ROUTES ----------

@app.route("/api/subjects", methods=["GET"])
def api_get_subjects():
    subjects = list_subjects()
    return jsonify(subjects)

@app.route("/api/streaks", methods=["GET"])
def api_get_streaks():
    current, longest = calculate_streaks()
    return jsonify(current, longest)

@app.route("/api/weekly", methods=["GET"])
def api_get_weekly():
    stats = get_weekly_stats()
    return jsonify(stats if stats else [])

@app.route("/api/monthly", methods=["GET"])
def api_get_monthly():
    stats = get_monthly_stats()
    return jsonify(stats if stats else [])

@app.route("/api/addSubject", methods=["POST"])
def api_add_subject():
    subject = request.get_json().get("subject")
    add_subject(subject)
    return jsonify({"message": "Received!"})

@app.route("/api/removeSubject", methods=["POST"])
def api_remove_subject():
    subject = request.get_json().get("subject")
    remove_subject(subject)
    return jsonify({"message": "Received"})

@app.route("/api/checkSubject", methods=["POST"])
def api_check_subject():
    subject = request.get_json().get("subject")
    res = check_if_subject_exists(subject)
    return jsonify({"res": res})

@app.route("/api/logSession", methods=["POST"])
def api_log_session():
    data = request.get_json()
    subject = data.get("subject")
    duration = data.get("duration")
    log_session(subject, duration)

    h, m, s = convert_seconds(duration)
    parts = []
    if h: parts.append(f"{h} hour{'s' if h != 1 else ''}")
    if m: parts.append(f"{m} minute{'s' if m != 1 else ''}")
    if s: parts.append(f"{s} second{'s' if s != 1 else ''}")
    formatted_time = ", ".join(parts) if parts else "0 seconds"

    return jsonify({"message": f"Logged {subject} for {formatted_time}!"})

# ---------- FRONTEND ROUTES ----------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    static_folder = app.static_folder
    assert static_folder is not None  
    file_path = os.path.join(static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, "index.html")

# ---------- START SERVER ----------

if __name__ == "__main__":
    import logging
    import webbrowser

    # Shut up Werkzeug’s default logs
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR) 

    url = "http://127.0.0.1:8000"
    print(f"Running StudyMate on {url}\n")

    try:
        webbrowser.open(url)
        print("Opening in your default browser...")
    except:
        print(f"Couldn't launch browser automatically — open {url} manually.")

    app.run(host="127.0.0.1", port=8000, debug=False)
