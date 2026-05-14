from fastapi import APIRouter
import requests
from config import SUPABASE_URL, SUPABASE_KEY
from datetime import datetime, timezone

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    """Return KPI counts and top cross-sold products."""
    try:
        # Total messages
        total_res = requests.get(
            f"{SUPABASE_URL}/rest/v1/messages?select=count",
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
        )
        total = int(total_res.headers.get("content-range", "0-0/0").split("/")[-1]) if total_res.status_code == 200 else 0

        # Delivered messages (simplistic: status = 'DELIVERED')
        delivered_res = requests.get(
            f"{SUPABASE_URL}/rest/v1/messages?status=eq.DELIVERED&select=count",
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
        )
        delivered = int(delivered_res.headers.get("content-range", "0-0/0").split("/")[-1]) if delivered_res.status_code == 200 else 0

        # Compute AI efficiency (delivered / total, default 0)
        efficiency = round((delivered / total * 100), 1) if total > 0 else 0.0

        # Revenue wins (mock for now, we'll add revenue tracking later)
        revenue_wins = [
            {"company": "Nexus Corp", "product": "Enterprise License", "value": "$12,400", "status": "SETTLED"},
            {"company": "Velocity Tech", "product": "AI Module Upgrade", "value": "$4,200", "status": "SETTLED"},
            {"company": "Lumina Media", "product": "Storage Expansion", "value": "$2,100", "status": "PROCESSING"}
        ]

        return {
            "total_messages": total,
            "conversion_rate": 24.6,        # still mock for now
            "ai_efficiency": efficiency,
            "messages_per_day": [            # mock for now
                {"name": "Mon", "messages": 1200},
                {"name": "Tue", "messages": 1500},
                # ...
            ],
            "top_cross_sell": [             # mock
                {"name": "Cloud Storage Pack", "value": 4200},
                {"name": "Content Pro", "value": 3800},
            ],
            "revenue_wins": revenue_wins
        }
    except Exception as e:
        return {"error": str(e)}