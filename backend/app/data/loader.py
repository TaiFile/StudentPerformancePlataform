import os
import numpy as np
import pandas as pd

CSV_PATH = os.path.join(
    os.path.dirname(__file__),
    "../../../../data_science/data/sample_students.csv",
)

SCORE_COLUMNS = ["math_score", "reading_score", "writing_score", "science_score"]
BEHAVIORAL_COLUMNS = ["study_hours_per_week", "attendance_rate", "sleep_hours"]
CATEGORICAL_COLUMNS = [
    "parental_education_level",
    "access_to_internet",
    "extracurricular_activities",
]


def _generate_synthetic_data() -> pd.DataFrame:
    rng = np.random.default_rng(42)
    n = 50

    parental_levels = ["elementary", "high_school", "bachelor", "master"]
    names = [f"Student_{i}" for i in range(1, n + 1)]

    data = {
        "student_id": list(range(1, n + 1)),
        "name": names,
        "math_score": rng.integers(25, 98, n).tolist(),
        "reading_score": rng.integers(28, 99, n).tolist(),
        "writing_score": rng.integers(26, 97, n).tolist(),
        "science_score": rng.integers(24, 96, n).tolist(),
        "study_hours_per_week": rng.integers(1, 22, n).tolist(),
        "attendance_rate": rng.integers(50, 100, n).tolist(),
        "parental_education_level": rng.choice(parental_levels, n).tolist(),
        "access_to_internet": rng.choice(["yes", "no"], n).tolist(),
        "extracurricular_activities": rng.choice(["yes", "no"], n).tolist(),
        "sleep_hours": rng.integers(4, 10, n).tolist(),
    }
    return pd.DataFrame(data)


def load_data() -> pd.DataFrame:
    path = os.path.abspath(CSV_PATH)
    if os.path.exists(path):
        df = pd.read_csv(path)
    else:
        df = _generate_synthetic_data()

    # Encode categorical columns as numeric for model use
    df["internet_num"] = (df["access_to_internet"] == "yes").astype(int)
    df["extracurricular_num"] = (df["extracurricular_activities"] == "yes").astype(int)
    edu_map = {"elementary": 0, "high_school": 1, "bachelor": 2, "master": 3}
    df["parental_edu_num"] = df["parental_education_level"].map(edu_map).fillna(1)

    df["avg_score"] = df[SCORE_COLUMNS].mean(axis=1)
    return df
