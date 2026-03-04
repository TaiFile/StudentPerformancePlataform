import pandas as pd
from app.data.loader import load_data, SCORE_COLUMNS

BEHAVIORAL_NUMERIC = [
    "study_hours_per_week",
    "attendance_rate",
    "sleep_hours",
    "internet_num",
    "extracurricular_num",
    "parental_edu_num",
]

BEHAVIORAL_LABELS = {
    "study_hours_per_week": "Study Hours/Week",
    "attendance_rate": "Attendance Rate",
    "sleep_hours": "Sleep Hours",
    "internet_num": "Internet Access",
    "extracurricular_num": "Extracurricular",
    "parental_edu_num": "Parental Education",
}

SCORE_LABELS = {
    "math_score": "Math",
    "reading_score": "Reading",
    "writing_score": "Writing",
    "science_score": "Science",
}


def run_correlation():
    df = load_data()
    analysis_df = df[BEHAVIORAL_NUMERIC + SCORE_COLUMNS].copy()

    corr_matrix = analysis_df.corr(method="pearson")
    behavioral_vs_scores = corr_matrix.loc[BEHAVIORAL_NUMERIC, SCORE_COLUMNS]

    records = []
    for beh_col in BEHAVIORAL_NUMERIC:
        for score_col in SCORE_COLUMNS:
            records.append(
                {
                    "behavioral_variable": BEHAVIORAL_LABELS[beh_col],
                    "score_variable": SCORE_LABELS[score_col],
                    "correlation": round(float(corr_matrix.loc[beh_col, score_col]), 4),
                }
            )

    # Also build a summary: correlation with avg_score
    df["avg_score"] = df[SCORE_COLUMNS].mean(axis=1)
    summary = []
    for col in BEHAVIORAL_NUMERIC:
        corr_val = float(df[col].corr(df["avg_score"]))
        summary.append(
            {
                "variable": BEHAVIORAL_LABELS[col],
                "correlation_with_avg_score": round(corr_val, 4),
            }
        )

    return {"matrix": records, "summary": summary}
