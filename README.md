# AfterSell AI — Automated Order Follow‑Up & Cross‑Sell Agent

**AfterSell AI** is a faceless AI automation micro‑service that helps Shopify store owners automatically thank each customer and cross‑sell relevant products after every purchase. It sends personalised emails via **OpenRouter** and **Resend**, and provides a beautiful dashboard to monitor performance.

---

## 🧠 How It Works

1. An order is placed in the store (or simulated via the dashboard).
2. The backend generates a personalised thank‑you + cross‑sell email using **OpenRouter** (Gemini Flash).
3. The email is delivered instantly via **Resend**.
4. All messages are logged to **Supabase**.
5. The store owner sees everything in a **React dashboard** — Communication Log, Analytics, and System Settings.

---

## 🛠 Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React (Vite), TypeScript, Tailwind CSS, Ant Design, Chart.js |
| Backend    | Python FastAPI, OpenRouter AI, Resend Email |
| Database   | Supabase (PostgreSQL)                   |
| Deployment | Vercel (frontend), Railway (backend)    |

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase project
- OpenRouter & Resend API keys

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env       # add your API keys
uvicorn main:app --reload --port 8000

### frontend
bash
cd frontend
npm install
npm run dev
The dashboard will be available at http://localhost:3000.

📊 Dashboard Pages
Dashboard — Overview with KPIs & charts

Communication Log — All sent AI messages, statuses, and a "Send Test Follow‑Up" button

Analytics — Messages per day, top cross‑sold products, revenue wins

System Settings — Configure AI tone, custom prompt, and response delay

📈 System Flow
Order Trigger → FastAPI → OpenRouter AI → Generate Email
                   ↓
              Send via Resend
                   ↓
            Log to Supabase
                   ↓
          React Dashboard (Messages, Analytics, Settings)

Project Structure
aftersellai-core/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── openai_service.py   # OpenRouter AI generation
│   │   │   └── email_service.py    # Resend email delivery
│   │   └── routers/
│   │       └── orders.py           # /api/simulate-order endpoint
│   ├── config.py                   # Environment variables
│   └── main.py                     # FastAPI entry point (CORS, router)
├── frontend/
│   ├── src/
│   │   ├── components/             # Dashboard UI components
│   │   ├── services/api.js         # Axios API client
│   │   └── App.tsx                 # Routing & layout
│   └── public/logo.png             # AfterSell AI brandmark
└── docs/
    ├── system-flow.md              # Detailed system flow diagram
    └── dashboard-sketch.jpg        # Original dashboard mockups

📝 Environment Variables
Create a .env file in the backend/ folder with:
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/
RESEND_API_KEY=re_...
SUPABASE_URL=https://...
SUPABASE_KEY=your-service-role-key

🎥 Demo Video (coming soon)
A 2‑minute screen‑share demo showing the full flow: button click → AI generation → email delivery.


