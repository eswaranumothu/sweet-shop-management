from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import router as auth_router
from app.sweets import router as sweets_router
from app.database import Base, engine
import app.models

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ CORS CONFIG (FINAL & CORRECT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sweet-shop-management.vercel.app",  # Vercel frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(sweets_router)

@app.get("/")
def root():
    return {"message": "Sweet Shop API running"}
