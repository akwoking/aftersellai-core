import resend
from config import RESEND_API_KEY

resend.api_key = RESEND_API_KEY

def send_email(to_email: str, subject: str, body: str) -> dict:
    try:
        response = resend.Emails.send({
            "from": "AfterSell AI <hello@aftersellai.com>",
            "to": [to_email],
            "subject": subject,
            "html": f"<p>{body.replace(chr(10), '<br>')}</p>"
        })
        return {"success": True, "id": response.get("id", "")}
    except Exception as e:
        print(f"Resend error: {e}")
        return {"success": False, "error": str(e)}