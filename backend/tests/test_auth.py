from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_user_can_register():
    response = client.post(
        "/api/auth/register",
        json={
            "email": "22bis70145@cuchd.in",
            "password": "password123"
        }
    )

    assert response.status_code == 201
    assert response.json()["email"] == "22bis70145@cuchd.in"
