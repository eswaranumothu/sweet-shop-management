from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Sweet
from app.security import get_current_user_email
from app.security import get_current_admin


router = APIRouter(prefix="/api/sweets", tags=["sweets"])


# ---------- Schemas ----------

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    price: float | None = None
    quantity: int | None = None

class SweetResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    quantity: int

    class Config:
        from_attributes = True


# ---------- DB Dependency ----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- Routes ----------

@router.post("", response_model=SweetResponse, status_code=status.HTTP_201_CREATED)
def add_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    new_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity
    )
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet


@router.get("", response_model=list[SweetResponse])
def list_sweets(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    return db.query(Sweet).all()


@router.get("/search", response_model=list[SweetResponse])
def search_sweets(
    name: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Sweet.category.ilike(category))
    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.all()


@router.post("/{sweet_id}/purchase")
def purchase_sweet(
    sweet_id: int,
    quantity: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.quantity < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock available")

    sweet.quantity -= quantity
    db.commit()
    db.refresh(sweet)

    return {
        "message": "Purchase successful",
        "remaining_quantity": sweet.quantity
    }

@router.post("/{sweet_id}/restock")
def restock_sweet(
    sweet_id: int,
    quantity: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.quantity += quantity
    db.commit()
    db.refresh(sweet)

    return {
        "message": "Restock successful",
        "current_quantity": sweet.quantity
    }

@router.delete("/{sweet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()

@router.put("/{sweet_id}", response_model=SweetResponse)
def update_sweet(
    sweet_id: int,
    sweet: SweetUpdate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email)
):
    existing_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not existing_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.name is not None:
        existing_sweet.name = sweet.name
    if sweet.category is not None:
        existing_sweet.category = sweet.category
    if sweet.price is not None:
        existing_sweet.price = sweet.price
    if sweet.quantity is not None:
        existing_sweet.quantity = sweet.quantity

    db.commit()
    db.refresh(existing_sweet)

    return existing_sweet
