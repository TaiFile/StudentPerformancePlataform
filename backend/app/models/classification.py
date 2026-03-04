from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from app.data.loader import load_data, SCORE_COLUMNS

FEATURE_COLUMNS = [
    "study_hours_per_week",
    "attendance_rate",
    "sleep_hours",
    "internet_num",
    "extracurricular_num",
    "parental_edu_num",
]

RISK_THRESHOLD = 60  # avg_score below this → at_risk


def _build_model(df: pd.DataFrame):
    df = df.copy()
    df["at_risk"] = (df["avg_score"] < RISK_THRESHOLD).astype(int)

    X = df[FEATURE_COLUMNS]
    y = df["at_risk"]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Use all data for final model (small dataset), but split for validation
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=y
    )

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    return clf, scaler


def run_predictions():
    df = load_data()
    clf, scaler = _build_model(df)

    X = df[FEATURE_COLUMNS]
    X_scaled = scaler.transform(X)
    proba = clf.predict_proba(X_scaled)

    risk_class_idx = list(clf.classes_).index(1) if 1 in clf.classes_ else 1

    results = []
    for i, row in df.iterrows():
        risk_prob = float(proba[i][risk_class_idx])
        results.append(
            {
                "student_id": int(row["student_id"]),
                "name": row["name"],
                "avg_score": round(float(row["avg_score"]), 2),
                "risk_probability": round(risk_prob, 4),
                "status": "at_risk" if risk_prob >= 0.5 else "no_risk",
            }
        )

    return results


def predict_single(student_data: dict) -> dict:
    df = load_data()
    clf, scaler = _build_model(df)

    features = [student_data.get(col, 0) for col in FEATURE_COLUMNS]
    X_scaled = scaler.transform([features])
    proba = clf.predict_proba(X_scaled)[0]

    risk_class_idx = list(clf.classes_).index(1) if 1 in clf.classes_ else 1
    risk_prob = float(proba[risk_class_idx])

    return {
        "risk_probability": round(risk_prob, 4),
        "status": "at_risk" if risk_prob >= 0.5 else "no_risk",
    }
