from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.routers import project, task, login, user
from app.auth import authenticate_user
from app import models

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)       

models.Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(login.router)
app.include_router(project.router)
app.include_router(task.router)