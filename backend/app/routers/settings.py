from fastapi import APIRouter
from pydantic import BaseModel
import requests
from config import SUPABASE_URL, SUPABASE_KEY
from typing import Optional

router = APIRouter()

class SettingsUpdate(BaseModel):
    tone: Optional[str] = None
    custom_prompt: Optional[str] = None
    delay_seconds: Optional[int] = None
    enabled: Optional[bool] = None

@router.get("/settings")
def get_settings():
    """Fetch the current store settings from Supabase."""
    try:
        # Ensure no double slashes
        url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/store_settings?id=eq.1"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Accept": "application/json"
        }
        res = requests.get(url, headers=headers)
        
        # Debug logging
        print(f"[GET /settings] Status: {res.status_code}, Body: {res.text[:200]}")
        
        if res.status_code == 200:
            data = res.json()
            if isinstance(data, list) and len(data) > 0:
                return data[0]
            # Return defaults if no row exists
            return {
                "id": 1,
                "tone": "friendly",
                "custom_prompt": "You are a helpful assistant for an online store.",
                "delay_seconds": 45,
                "enabled": True
            }
        else:
            return {"error": f"Supabase returned {res.status_code}: {res.text}"}
    except Exception as e:
        return {"error": f"Exception: {str(e)}"}

@router.put("/settings")
def update_settings(settings: SettingsUpdate):
    """Update store settings. Only the provided fields will change."""
    try:
        url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/store_settings?id=eq.1"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        update_dict = {k: v for k, v in settings.model_dump().items() if v is not None}
        
        print(f"[PUT /settings] Updating with: {update_dict}")
        
        res = requests.patch(url, headers=headers, json=update_dict)
        
        if res.status_code in [200, 201]:
            return {"success": True, "data": res.json()}
        else:
            return {"success": False, "error": f"Supabase returned {res.status_code}: {res.text}"}
    except Exception as e:
        return {"success": False, "error": f"Exception: {str(e)}"}