from chatbot.gemeni_settings import model, genai
from models.chatbot_model import Chat, ChatResponseBody
from chatbot.app import app
from database.db import gemeni_key, session
from sqlmodel import select
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
genai.configure(api_key=gemeni_key)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_main():
    return {"message": "Hello Gemeni Chatbot!"}

@app.get("/chat/", response_model=list[ChatResponseBody])
def get_chats_data(session: session):
    chats = session.exec(select(Chat)).all()
    return chats

@app.post("/chat/", response_model=ChatResponseBody)
def create_prompts(prompt: str, session:session):
    bot_response= model.start_chat(history=[])
    bot_response.send_message(prompt)
    message = Chat(prompt=prompt, chats=bot_response.last.text)
    if message:
        session.add(message)
        session.commit()
        session.refresh(message)
        return message
    else:
        raise HTTPException(status_code=500, detail="Something went wrong creating your chat")
    

@app.delete("/chat/", response_model=ChatResponseBody)
def delete_chats(id: int, session:session):
    chats = session.exec(select(Chat).where(Chat.id == id)).first()
    if not chats:
        raise HTTPException(status_code=404, detail="no chats found!")
    session.delete(chats)
    session.commit()
    return chats