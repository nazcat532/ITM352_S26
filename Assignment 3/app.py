import json
import random
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Load questions dynamically from JSON [cite: 17, 24]
def load_questions():
    with open('questions.json', 'r') as f:
        questions = json.load(f)
    random.shuffle(questions)  # Randomize question order [cite: 18]
    return questions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/questions')
def get_questions():
    questions = load_questions()
    # Randomize answer options for each question [cite: 18]
    for q in questions:
        random.shuffle(q['options'])
    return jsonify(questions)

if __name__ == "__main__":
    app.run(debug=True)