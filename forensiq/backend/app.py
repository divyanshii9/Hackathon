from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/analyse", methods=["POST"])
def analyse():

    data = request.json

    area = float(data.get("area", 0))
    risk = data.get("risk", "Low").lower()

    score = 0

    if area >= 3:
        score += 40
    elif area >= 1:
        score += 25
    else:
        score += 10

    if risk == "high":
        score += 40
    elif risk == "medium":
        score += 25
    else:
        score += 10

    if score >= 65:
        category = "High"
    elif score >= 40:
        category = "Medium"
    else:
        category = "Low"

    return jsonify({
        "risk_score": score,
        "risk_category": category,
        "message": f"This incident has a {category.lower()} priority for investigation."
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)