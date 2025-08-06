from flask import Flask, request, jsonify
from flask_cors import CORS
from base import list_subjects

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)

@app.route("/api/subjects", methods=["GET"])
def api_get_subjects():
    subjects = list_subjects()
    return jsonify(subjects)

if __name__ == "__main__":
    app.run()