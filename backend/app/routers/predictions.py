from fastapi import APIRouter
from pydantic import BaseModel
from app.models.classification import run_predictions, predict_single

router = APIRouter()


class StudentInput(BaseModel):
    study_hours_per_week: float = 10
    attendance_rate: float = 80
    sleep_hours: float = 7
    internet_num: int = 1
    extracurricular_num: int = 0
    parental_edu_num: int = 1


@router.get("/predictions")
def get_predictions():
    return {"predictions": run_predictions()}


@router.post("/predict")
def predict(student: StudentInput):
    return predict_single(student.model_dump())
