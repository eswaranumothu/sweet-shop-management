from fastapi import APIRouter, status, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import SessionLocal
from app.models import User
from app.security import create_access_token, get_current_user_email

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


# ---------- Schemas ----------

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ---------- DB Dependency ----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- Password Utils ----------

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# ---------- Routes ----------

@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=RegisterResponse
)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):

    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 🔐 Assign role
    role = "admin" if data.email == "admin@example.com" else "user"

    user = User(
        email=data.email,
        hashed_password=hash_password(data.password),
        role=role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"email": user.email}


@router.post("/login")
def login_user(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role   # 👈 VERY IMPORTANT
    }


@router.get("/me")
def read_current_user(email: str = Depends(get_current_user_email)):
    return {"email": email}
