from sqlmodel import SQLModel, Field

class ChatBotModel(SQLModel):
    prompt: str
    chats: str
    
class Chat(ChatBotModel, table=True):
    id: int | None = Field(None, primary_key=True)
    
class ChatResponseBody(ChatBotModel):
    id: int
    prompt: str
    chats: str