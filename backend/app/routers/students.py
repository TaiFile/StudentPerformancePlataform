from fastapi import APIRouter
from app.data.loader import load_data, SCORE_COLUMNS

router = APIRouter()


@router.get("/students")
def get_students():
    df = load_data()
    cols = (
        ["student_id", "name", "avg_score"]
        + SCORE_COLUMNS
        + [
            "study_hours_per_week",
            "attendance_rate",
            "parental_education_level",
            "access_to_internet",
            "extracurricular_activities",
            "sleep_hours",
        ]
    )
    return df[cols].to_dict(orient="records")


@router.get("/students/{student_id}")
def get_student(student_id: int):
    df = load_data()
    student = df[df["student_id"] == student_id]
    if student.empty:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Student not found")
    return student.iloc[0].to_dict()
