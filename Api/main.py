from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import router
from database import init_db


app = FastAPI()
app.include_router(router)

origins = [
    "http://localhost:5173/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

init_db() 

@app.get("/")
def root(): 
    return {"Order Management API"}




