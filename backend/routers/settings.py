from fastapi import APIRouter
from pydantic import BaseModel
import requests
from config import SUPABASE_URL, SUPABASE_KEY
from typing import Optional

router = APIRouter()

# Pydantic model for the settings body
class SettingsUpdate(BaseModel):
    tone: Optional[str] = None
    custom_prompt: Optional[str] = None
    delay_seconds: Optional[int] = None
    enabled: Optional[bool] = None

@router.get("/settings")
def get_settings():
    """Fetch the current store settings from Supabase."""
    try:
        res = requests.get(
            f"{SUPABASE_URL}/rest/v1/store_settings?id=eq.1",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
        )
        data = res.json()
        if len(data) > 0:
            return data[0]
        return {}
    except Exception as e:
        return {"error": str(e)}

@router.put("/settings")
def update_settings(settings: SettingsUpdate):
    """Update store settings. Only the provided fields will change."""
    update_dict = {k: v for k, v in settings.dict().items() if v is not None}
    try:
        res = requests.patch(
            f"{SUPABASE_URL}/rest/v1/store_settings?id=eq.1",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            json=update_dict
        )
        if res.status_code in [200, 201]:
            return {"success": True, "data": res.json()}
        else:
            return {"success": False, "error": res.text}
    except Exception as e:
        return {"success": False, "error": str(e)}