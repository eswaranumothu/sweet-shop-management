from fastapi import APIRouter, status
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/auth", tags=["auth"])


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    email: EmailStr


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(data: RegisterRequest):
    # Minimal implementation for now (TDD Green phase)
    return {"email": data.email}
