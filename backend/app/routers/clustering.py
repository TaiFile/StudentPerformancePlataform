from fastapi import APIRouter
from app.models.clustering import run_clustering

router = APIRouter()


@router.get("/clustering")
def get_clustering():
    return {"clusters": run_clustering()}
