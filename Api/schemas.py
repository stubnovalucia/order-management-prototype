from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

class OrderBase(BaseModel):
    category: str
    brand: str
    price: float = Field(gt=0, description="Cena musí byť väčšia ako 0.") 
    status: str

class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)  
