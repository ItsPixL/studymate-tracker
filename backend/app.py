from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from typing import cast
import os
import webbrowser

# Import your backend logic
from base import (
    list_subjects, calculate_streaks, get_weekly_stats, get_monthly_stats,
    add_subject, remove_subject, convert_seconds, log_session, check_if_subject_exists
)

# Path to the React dist directory
frontend_dir = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../frontend/studymate-frontend/dist")
)
static_folder: str = cast(str, frontend_dir)

# Initialize Flask app
app = Flask(__name__, static_folder=frontend_dir, static_url_path="")
CORS(app)

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
    assert static_folder is not None  # Tell type checker this is safe
    file_path = os.path.join(static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, "index.html")

# ---------- START SERVER ----------

if __name__ == "__main__":
    port = 5000
    url = f"http://localhost:{port}"
    print(f"🚀 Serving app at {url}")
    webbrowser.open(url)  # Open in browser automatically
    app.run(debug=False, port=port)
