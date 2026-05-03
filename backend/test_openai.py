from app.services.openai_service import generate_followup_message

msg = generate_followup_message(
    product_name="Wireless Headphones",
    related_products=["Headphone Stand", "Bluetooth Adapter", "Carrying Case"],
    tone="friendly"
)
print("AI Generated Email:\n")
print(msg)