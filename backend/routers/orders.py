from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
import requests
from config import SUPABASE_URL, SUPABASE_KEY
from app.services.openai_service import generate_followup_message
from app.services.email_service import send_email

router = APIRouter()

class OrderRequest(BaseModel):
    customer_email: str
    product_name: str
    related_products: list[str] = []
    tone: str = "friendly"

@router.post("/simulate-order")
async def simulate_order(order: OrderRequest):
    ai_message = generate_followup_message(
        product_name=order.product_name,
        related_products=order.related_products,
        tone=order.tone
    )

    subject = "Thanks for your order! Here's something you might love ✨"
    email_result = send_email(to_email=order.customer_email, subject=subject, body=ai_message)

    # Log to Supabase using REST API directly
    log_entry = {
        "customer_email": order.customer_email,
        "product_name": order.product_name,
        "message_body": ai_message,
        "status": "DELIVERED" if email_result["success"] else "FAILED",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    try:
        requests.post(
            f"{SUPABASE_URL}/rest/v1/messages",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            json=log_entry
        )
    except Exception as e:
        print(f"Supabase log error: {e}")

    return {
        "success": email_result["success"],
        "message_id": email_result.get("id"),
        "ai_message": ai_message,
        "status": "DELIVERED" if email_result["success"] else "FAILED"
    }