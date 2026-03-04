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

    Assigns labels based on cluster centre characteristics (in scaled space):
    - Lowest average score → "Defasagem de Base" (knowledge gap)
    - Lowest engagement (study hours + attendance) among remaining → "Falta de Engajamento"
    - Remaining cluster → "Dificuldade Conceitual" (conceptual difficulty)

    Using a priority queue approach avoids label collision when the lowest-scoring
    cluster also has the lowest engagement.
    """
    score_means = centers[:, :4].mean(axis=1)     # math, reading, writing, science
    engagement_means = centers[:, 4:].mean(axis=1)  # study_hours, attendance

    unassigned = set(range(len(centers)))
    label_map = {}

    # Priority 1: lowest scores → Defasagem de Base
    worst_score_idx = int(np.argmin(score_means))
    label_map[worst_score_idx] = "Defasagem de Base"
    unassigned.discard(worst_score_idx)

    # Priority 2: among remaining, lowest engagement → Falta de Engajamento
    if unassigned:
        remaining = list(unassigned)
        least_engaged = remaining[int(np.argmin(engagement_means[remaining]))]
        label_map[least_engaged] = "Falta de Engajamento"
        unassigned.discard(least_engaged)

    # Priority 3: leftover cluster → Dificuldade Conceitual
    for idx in unassigned:
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
