from fastapi import APIRouter
import requests
from config import SUPABASE_URL, SUPABASE_KEY
from datetime import datetime, timezone


router = APIRouter()
@router.get("/analytics")


def get_analytics():
    try:
        # Count total messages
        total_res = requests.get(
            f"{SUPABASE_URL}/rest/v1/messages?select=count",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
        )
        total = 0
        if total_res.status_code == 200:
            # The response is a JSON array with a single object: [{"count": N}]
            data = total_res.json()
            if isinstance(data, list) and len(data) > 0:
                total = data[0].get("count", 0)
        else:
            print(f"Error counting messages: {total_res.text}")

        # Count delivered messages (optional, for efficiency metric)
        delivered_res = requests.get(
            f"{SUPABASE_URL}/rest/v1/messages?status=eq.DELIVERED&select=count",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
        )
        delivered = 0
        if delivered_res.status_code == 200:
            ddata = delivered_res.json()
            if isinstance(ddata, list) and len(ddata) > 0:
                delivered = ddata[0].get("count", 0)

        efficiency = round((delivered / total * 100), 1) if total > 0 else 0.0

        return {
            "total_messages": total,
            "conversion_rate": 24.6,      # still mock for now
            "ai_efficiency": efficiency,
            "messages_per_day": [],        # mock (can fill later)
            "top_cross_sell": [],
            "revenue_wins": []
        }
    except Exception as e:
        return {"error": str(e)}