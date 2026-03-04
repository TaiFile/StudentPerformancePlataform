from fastapi import APIRouter
from app.models.correlation import run_correlation

router = APIRouter()


@router.get("/correlation")
def get_correlation():
    return run_correlation()
