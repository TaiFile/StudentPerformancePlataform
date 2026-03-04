from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from app.data.loader import load_data, SCORE_COLUMNS

CLUSTER_FEATURES = [
    "math_score",
    "reading_score",
    "writing_score",
    "science_score",
    "study_hours_per_week",
    "attendance_rate",
]

CLUSTER_LABELS = [
    "Dificuldade Conceitual",
    "Falta de Engajamento",
    "Defasagem de Base",
]


def _assign_label(centers: np.ndarray, cluster_idx: int) -> str:
    """Map KMeans cluster index to a human-readable profile label.

    Rules (applied to scaled centres):
    - Lowest average score + moderate engagement → Defasagem de Base
    - Lowest study hours + low attendance → Falta de Engajamento
    - Middle performance but low concept scores → Dificuldade Conceitual
    """
    score_means = centers[:, :4].mean(axis=1)   # math, reading, writing, science
    engagement_means = centers[:, 4:].mean(axis=1)  # study_hours, attendance

    sorted_score = np.argsort(score_means)   # ascending: worst → best
    sorted_engage = np.argsort(engagement_means)  # ascending: least → most

    label_map = {}
    label_map[sorted_score[0]] = "Defasagem de Base"
    label_map[sorted_engage[0]] = "Falta de Engajamento"
    for idx in range(len(centers)):
        if idx not in label_map:
            label_map[idx] = "Dificuldade Conceitual"

    return label_map.get(cluster_idx, "Dificuldade Conceitual")


def run_clustering():
    df = load_data()
    X = df[CLUSTER_FEATURES].copy()
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    df["cluster"] = kmeans.fit_predict(X_scaled)
    centers = kmeans.cluster_centers_

    df["cluster_label"] = df["cluster"].apply(lambda c: _assign_label(centers, c))

    result = []
    for label in df["cluster_label"].unique():
        group = df[df["cluster_label"] == label]
        students = group[
            ["student_id", "name", "avg_score", "cluster_label"]
            + SCORE_COLUMNS
        ].to_dict(orient="records")
        result.append(
            {
                "cluster_label": label,
                "count": len(group),
                "avg_score": round(group["avg_score"].mean(), 2),
                "students": students,
            }
        )

    return result
