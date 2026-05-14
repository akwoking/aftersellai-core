import openai
from config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL

# Initialize OpenRouter client
client = openai.OpenAI(
    base_url=OPENROUTER_BASE_URL,
    api_key=OPENROUTER_API_KEY,
)

def generate_followup_message(
    product_name: str,
    related_products: list[str],
    tone: str = "friendly"
) -> str:
    """
    Generates a thank-you email with a soft cross-sell using OpenRouter.
    """
    related_list = ", ".join(related_products) if related_products else "something complementary"

    system_prompt = (
        f"You are a warm, helpful assistant for an online store. "
        f"A customer just purchased '{product_name}'. "
        f"Write a short thank-you email (2-4 sentences) that thanks them sincerely "
        f"and gently suggests they might also like: {related_list}. "
        f"The tone should be {tone}. "
        f"Do NOT use placeholders like [Name] or [Customer]. Just write the email body."
    )

    try:
        response = client.chat.completions.create(
            model="google/gemini-2.0-flash-001",  # fast, cheap, excellent for writing
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Product: {product_name}. Tone: {tone}."}
            ],
            temperature=0.7,
            max_tokens=300,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenRouter error: {e}")
        return f"Thank you for your purchase of {product_name}! We hope you love it. Would you like to explore {related_list}?"