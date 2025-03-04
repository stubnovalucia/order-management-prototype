from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, database

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, db: Session = Depends(database.get_db)):
    return crud.create_order(db, order)

@router.get("/", response_model=list[schemas.OrderResponse])
def read_orders(skip: int = 0, limit: int = 200, db: Session = Depends(database.get_db)):
    return crud.get_orders(db, skip, limit)

@router.get("/{order_id}", response_model=schemas.OrderResponse)
def read_order(order_id: int, db: Session = Depends(database.get_db)):
    order = crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=schemas.OrderResponse)
def update_order(order_id: int, order: schemas.OrderUpdate, db: Session = Depends(database.get_db)):
    print("running update order")
    updated_order = crud.update_order(db, order_id, order)
    if not updated_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated_order

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(database.get_db)):
    deleted_order = crud.delete_order(db, order_id)
    if not deleted_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted successfully"}