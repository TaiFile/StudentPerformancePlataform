from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import students, clustering, predictions, correlation

app = FastAPI(
    title="Edumetrics AI",
    description="Predictive analytics platform for student academic performance",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router, prefix="/api")
app.include_router(clustering.router, prefix="/api")
app.include_router(predictions.router, prefix="/api")
app.include_router(correlation.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Edumetrics AI API", "docs": "/docs"}
