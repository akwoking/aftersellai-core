from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import settings
from backend.routers import analytics, orders

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.108:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analytics.router, prefix="/api")
app.include_router(orders.router, prefix="/api")                            
app.include_router(settings.router, prefix="/api")
@app.get("/health")
async def health():
    return {"status": "ok"}