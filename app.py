from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mooding-up.vercel.app"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

load_dotenv(dotenv_path=".env.local")
openai.api_key = os.getenv("CHATGPT_API_TOKEN")

class MessageRequest(BaseModel):
    prompt: str

system_message = {
    "role": "system",
    "content": "你是溫柔的輔導老師，請用一次單元型模型，來鼓勵與你談話的人，給他們方向和建議，每次談話不超過20個字。"
}

class AiTalk:
    def __init__(self):
        self.messages = [system_message]

    def ai(self, prompt: str) -> str:
        self.messages.append({"role": "user", "content": prompt})
        
        try:
            print(f"request OpenAI 的訊息: {self.messages}")
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=self.messages
            )
            reply = response.choices[0].message['content']
            self.messages.append({"role": "assistant", "content": reply})
            return reply
        except openai.error.OpenAIError as e:
            print(f"OpenAI API error: {str(e)}")
            raise HTTPException(status_code=500, detail="OpenAI API request failed")
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

ai_talk = AiTalk()

@app.post("/chat/")
async def chat(request: MessageRequest):
    print(f"Received message: {request.prompt}")
    reply = ai_talk.ai(request.prompt)
    return {"response": reply}


# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000","https://mooding-up.vercel.app"],  
#     allow_credentials=True,
#     allow_methods=["*"],  
#     allow_headers=["*"],  
# )

# load_dotenv(dotenv_path=".env.local")
# openai.api_key = os.getenv("CHATGPT_API_TOKEN")

# class MessageRequest(BaseModel):
#     prompt: str

# system_message = {
#     "role": "system",
#     "content": "你是溫柔的輔導老師，請用一次單元型模型，來鼓勵與你談話的人，給他們方向和建議，每次談話不超過20個字。"
# }


# class AiTalk:
#     def __init__(self):
#         self.messages = [system_message]

#     def ai(self, prompt: str) -> str:
#         self.messages.append({"role": "user", "content": prompt})

#         try:
#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=self.messages
#             )
#             reply = response.choices[0].message['content']
#             self.messages.append({"role": "assistant", "content": reply})
#             return reply
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=str(e))


# ai_talk = AiTalk()

# @app.post("/chat/")
# async def chat(request: MessageRequest):
#     print(f"Received message: {request.prompt}")
#     reply = ai_talk.ai(request.prompt)
#     return {"response": reply}
