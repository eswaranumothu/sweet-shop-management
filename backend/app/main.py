from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import router as auth_router
from app.sweets import router as sweets_router
from app.database import Base, engine
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ FIXED CORS (PRODUCTION + LOCAL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sweet-shop-management.vercel.app",
        "https://sweet-shop-management-seven.vercel.app",  # ✅ ADD THIS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(sweets_router)

@app.get("/")
def root():
    return {"message": "Sweet Shop API running"}
