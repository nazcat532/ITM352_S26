from flask import Flask, render_template, request, redirect, url_for, send_file, flash
import os
import json
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
from datetime import datetime

app = Flask(__name__)
app.secret_key = "replace-this-with-random-secret"

PROFILE_FILE = "user_profile.json"
PROGRESS_FILE = "progress.csv"

# Ensure progress file exists
if not os.path.exists(PROGRESS_FILE):
    df = pd.DataFrame(columns=["date","exercise","weight","reps"])
    df.to_csv(PROGRESS_FILE,index=False)

# Simple planner logic: returns a list of dicts {exercise, sets, reps}
def generate_plan(profile):
    goal = profile.get("goal","general").lower()
    body_type = profile.get("body_type","balanced").lower()
    targets = profile.get("targets",[])
    plan = []

    # base exercise pool
    exercises = {
        "chest": ["Push-ups","Bench Press","Incline Dumbbell Press"],
        "back": ["Pull-ups","Bent-over Row","Lat Pulldown"],
        "legs": ["Squats","Lunges","Romanian Deadlift"],
        "shoulders": ["Overhead Press","Lateral Raise","Front Raise"],
        "arms": ["Bicep Curl","Triceps Dip","Hammer Curl"],
        "core": ["Plank","Hanging Leg Raise","Russian Twist"]
    }

    # choose target areas or default full-body
    if not targets:
        targets = ["chest","back","legs","shoulders","arms","core"]

    for area in targets:
        area_lower = area.lower()
        pool = exercises.get(area_lower, [])
        for i, ex in enumerate(pool[:2]):  # pick up to 2 exercises per area
            # set/rep logic:
            if goal == "strength":
                sets, reps = (4, 4 if i==0 else 5)
            elif goal == "hypertrophy" or goal == "muscle":
                sets, reps = (3, 8 if i==0 else 10)
            elif goal == "endurance":
                sets, reps = (3, 15 if i==0 else 20)
            else:  # general/toning
                sets, reps = (3, 10 if i==0 else 12)

            # body type could slightly adjust reps
            if body_type == "endomorph" and goal=="strength":
                reps += 1
            if body_type == "ectomorph" and goal!="endurance":
                reps += 1

            plan.append({"area": area.title(), "exercise": ex, "sets": sets, "reps": reps})
    return plan

@app.route("/")
def index():
    profile = {}
    if os.path.exists(PROFILE_FILE):
        try:
            with open(PROFILE_FILE,"r") as f:
                content = f.read().strip()
                if content:
                    profile = json.loads(content)
        except (json.JSONDecodeError, IOError):
            profile = {}
    return render_template("index.html", profile=profile)

@app.route("/create_profile", methods=["GET","POST"])
def create_profile():
    if request.method == "POST":
        goal = request.form.get("goal","general")
        body_type = request.form.get("body_type","balanced")
        targets = request.form.getlist("targets")
        profile = {"goal": goal, "body_type": body_type, "targets": targets}
        with open(PROFILE_FILE,"w") as f:
            json.dump(profile,f)
        flash("Profile saved.")
        return redirect(url_for("view_plan"))
    return render_template("create_profile.html")

@app.route("/view_plan")
def view_plan():
    if not os.path.exists(PROFILE_FILE):
        flash("No profile found. Please create one.")
        return redirect(url_for("create_profile"))
    try:
        with open(PROFILE_FILE,"r") as f:
            content = f.read().strip()
            if not content:
                flash("No profile found. Please create one.")
                return redirect(url_for("create_profile"))
            profile = json.loads(content)
    except json.JSONDecodeError:
        flash("Error reading profile. Please create a new one.")
        return redirect(url_for("create_profile"))
    plan = generate_plan(profile)
    return render_template("view_plan.html", profile=profile, plan=plan)

@app.route("/log_progress", methods=["GET","POST"])
def log_progress():
    if request.method == "POST":
        date = request.form.get("date") or datetime.now().strftime("%Y-%m-%d")
        exercise = request.form.get("exercise")
        weight = request.form.get("weight")
        reps = request.form.get("reps")
        if not (exercise and weight and reps):
            flash("Fill all fields.")
            return redirect(url_for("log_progress"))
        df = pd.read_csv(PROGRESS_FILE)
        new = {"date": date, "exercise": exercise, "weight": float(weight), "reps": int(reps)}
        df = pd.concat([df, pd.DataFrame([new])], ignore_index=True)
        df.to_csv(PROGRESS_FILE, index=False)
        flash("Logged.")
        return redirect(url_for("view_plan"))
    # populate exercise options from last plan if exists
    exercises = []
    if os.path.exists(PROFILE_FILE):
        try:
            with open(PROFILE_FILE,"r") as f:
                content = f.read().strip()
                if content:
                    profile = json.loads(content)
                    plan = generate_plan(profile)
                    exercises = [p["exercise"] for p in plan]
        except (json.JSONDecodeError, IOError):
            pass
    return render_template("log_progress.html", exercises=exercises)

@app.route("/progress_chart")
def progress_chart():
    # expects query params exercise to filter
    exercise = request.args.get("exercise")
    df = pd.read_csv(PROGRESS_FILE)
    if exercise:
        df = df[df["exercise"]==exercise]
    if df.empty:
        flash("No progress data to show.")
        return redirect(url_for("view_plan"))
    # convert date
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    fig, ax1 = plt.subplots(figsize=(7,4))
    ax1.plot(df['date'], df['reps'], color='tab:blue', marker='o', label='reps')
    ax1.set_ylabel('Reps', color='tab:blue')
    ax2 = ax1.twinx()
    ax2.plot(df['date'], df['weight'], color='tab:red', marker='x', label='weight')
    ax2.set_ylabel('Weight', color='tab:red')
    plt.title(f"Progress - {exercise or 'All Exercises'}")
    fig.autofmt_xdate()
    buf = BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True, port=5001)
