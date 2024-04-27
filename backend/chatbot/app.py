from fastapi import FastAPI
from database.db import create_tables

async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(lifespan=lifespan)