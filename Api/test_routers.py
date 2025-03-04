import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from database import Base, get_db

DATABASE_URL = "mysql+pymysql://test_user:test_password@mariadb_test:3306/order_management_test"
engine = create_engine(DATABASE_URL,  echo=True)
TestingSessionLocal =  sessionmaker(autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def test_order():
    return {
        "category": "LKW",
        "brand": "BMW",
        "price": 299.99,
        "status": "Vytvorená"
    }

def test_create_order(test_order):
    response = client.post("/orders/", json=test_order)
    assert response.status_code == 200
    assert response.json()["category"] == test_order["category"]

def test_read_orders():
    response = client.get("/orders/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_order(test_order):
    # Create an order to read
    create_response = client.post("/orders/", json=test_order)
    order_id = create_response.json()["id"]

    # Read the order
    response = client.get(f"/orders/{order_id}")
    assert response.status_code == 200
    assert response.json()["id"] == order_id

def test_update_order(test_order):
    # Create an order to update
    create_response = client.post("/orders/", json=test_order)
    order_id = create_response.json()["id"]

    # Update the order
    updated_order = test_order.copy()
    updated_order["status"] = "Vybavená"
    response = client.put(f"/orders/{order_id}", json=updated_order)
    assert response.status_code == 200
    assert response.json()["status"] == "Vybavená"

def test_delete_order(test_order):
    # Create an order to delete
    create_response = client.post("/orders/", json=test_order)
    order_id = create_response.json()["id"]

    # Delete the order
    response = client.delete(f"/orders/{order_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Order deleted successfully"

    # Verify the order is deleted
    response = client.get(f"/orders/{order_id}")
    assert response.status_code == 404