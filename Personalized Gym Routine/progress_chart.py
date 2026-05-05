import matplotlib.pyplot as plt
from datetime import datetime

def show_progress_chart(progress_log):
    dates = []
    weights = []
    reps = []

    for entry in progress_log:
        dates.append(datetime.strptime(entry["date"], "%Y-%m-%d"))
        weights.append(entry["weight"])
        reps.append(entry["reps"])

    plt.plot(dates, weights, marker='o', label="Weight")
    plt.plot(dates, reps, marker='s', label="Reps")

    plt.title("Workout Progress")
    plt.xlabel("Date")
    plt.ylabel("Progress")
    plt.legend()
    plt.xticks(rotation=45)
    plt.grid()

    plt.show()

if __name__ == "__main__":
    sample_data = [
        {"date": "2026-04-01", "weight": 100, "reps": 8},
        {"date": "2026-04-05", "weight": 105, "reps": 9},
        {"date": "2026-04-10", "weight": 110, "reps": 10}
    ]
    show_progress_chart(sample_data)
  