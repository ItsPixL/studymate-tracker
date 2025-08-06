from flask import Flask, request, jsonify
from flask_cors import CORS
from base import list_subjects, calculate_streaks, get_weekly_stats, get_monthly_stats, add_subject

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

if __name__ == "__main__":
    app.run()