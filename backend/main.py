from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.routers import orders

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders.router, prefix="/api")

@app.get("/health")
async def health():
    return {"status": "ok"}