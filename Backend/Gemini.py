from flask import jsonify
import google.generativeai as genai
import os
from gtts import gTTS
from playsound import playsound
import time

# API Key và cấu hình Generative AI
os.environ["API_KEY"] = "AIzaSyAhuxSrWShqIKQUbptlrfIUnfsIg1XADv0"
genai.configure(api_key=os.environ["API_KEY"])

generation_configuration = {"temperature": 0.7, "top_p": 1, "top_k": 1}
safetySettings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

model = genai.GenerativeModel("gemini-1.5-flash", generation_config=generation_configuration, safety_settings=safetySettings)

system_message1 = """
SYSTEM MESSAGE: You are being used to power a voice assistant and should respond as so.
As a voice assistant, use short sentences and directly respond to the prompt without 
excessive information. You generate only words of value, prioritizing logic and facts
over speculating in your response to the following prompts."""
system_message = system_message1.replace('\n', '')

personal_information = """
"Hello! you are Sarah, my dedicated assistant. 
I'm  Hà Minh Dũng, a 20-year-old Information Technology student at VinUniversity, manage tasks, tackle assignments, and find resources to make studying easier. 
I enjoy reading manga and hitting the gym, and i need recommendations and workout tips when needed. 
Whether it's academic assistance or daily reminders, you are just a message away. You are here to make my life easier, 
 And say hi to my roommates Đạt Chai, Thái Minh Dũng, and Lê Ngọc Toàn"""
personal_information = personal_information.replace('\n', '')

Chat = model.start_chat(
    history=[
        {"role": "user", "parts": system_message1},
        {"role": "model", "parts": "Ok"},
        {"role": "user", "parts": personal_information},
        {"role": "model", "parts": "Sure"},
    ]
)

def chatbot_response(user_input):
    Chat.send_message(user_input)
    return Chat.last.text
