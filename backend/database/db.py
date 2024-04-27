from starlette.config import Config
from sqlmodel import SQLModel, Session ,create_engine
from typing import Annotated
from fastapi import Depends
try:
    config = Config(".env")
except FileNotFoundError as error:
    print(error)
    
db = config("DATABASE_URL")
gemeni_key = config("GEMENI_API_KEY")


connection_string = str(db).replace("postgresql", "postgresql+psycopg2")

engine = create_engine(connection_string, pool_recycle=300)


def create_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session
        
session = Annotated[Session, Depends(get_session)]