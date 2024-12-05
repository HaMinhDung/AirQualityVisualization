from flask import jsonify
import google.generativeai as genai
import os
from gtts import gTTS
import firebase_admin
from firebase_admin import credentials, db
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

from plotGraph import fetch_data2 









# API Key và cấu hình Generative AI
os.environ["API_KEY"] = "AIzaSyAhuxSrWShqIKQUbptlrfIUnfsIg1XADv0"
genai.configure(api_key=os.environ["API_KEY"])

generation_configuration = {"temperature": 0.7, "top_p": 1, "top_k": 1}


model = genai.GenerativeModel("gemini-1.5-flash", generation_config=generation_configuration)

system_message1 = """
SYSTEM MESSAGE: Your name is Green, you are a voice assistant for an air quality monitoring website. 
Respond concisely and accurately to questions about air quality data and guide 
users in using the website. Prioritize facts, clarity, and brevity in your answers. 
You might be asked in different languages, especially Vietnamese and English, keep that in mind.
"""
system_message = system_message1.replace('\n', '')

website_guidance = """
SYSTEM MESSAGE: You are a voice assistant for an air quality monitoring website. 
Use the following guidance under the **website_guidance** context to assist users 
in navigating and utilizing the website effectively.

The main interface, **Home**, is where you can view static information from the 
sensors you have configured. Currently, the data displayed is placeholder data as 
live data has not been linked. The parameters available include AQI CN, PM2.5, PM10,
 PM1, CO2, Temperature (°C), Humidity, and Temperature (°F), along with a comparison 
 to last month's metrics (+- x% from last month).

On the left side of the website, you'll find the **Menu Bar**. At the top is 
the **Home** button, represented by a house icon and the label "Home," which 
redirects you to the main interface. Below it is the **3D Models** section, 
where you can manage and view 3D models stored on the server. Clicking on this 
section reveals two options: **Display 3D Models** and **Manage 3D Models**. 

Under **Manage 3D Models**, you can upload your 3D models, with a 
recommended file format of **.glb** for optimal compatibility. Other formats 
like STL, PLY, or OBJ are also supported, but these will be converted to .glb. 
Be aware that the conversion process may not always be successful due to file 
format limitations, so prioritize using .glb files. This page also allows you 
to view existing models on the server and delete any if needed. Uploaded models 
are automatically named with the smallest unused integer (e.g., if models 3, 4, 7, 
and 8 exist, the new model will be named 1). In **Display 3D Models**, you can 
select a model to display via the dropdown menu in the upper-left corner. 
Additionally, clicking **Show More** in the top-right corner reveals static 
sensor data linked to the 3D model’s physical location.

Beneath the **Home** and **3D Models** sections in the Menu is the **Data** 
section. Hovering over it provides access to pages like **Data Analytics**, 
*Time-Series Analytics**, **Customized BI Reports**, and **Waste Log**. 
Currently, only **Time-Series Analytics** is active. On this page, 
sensor data is visualized as time-series graphs. You can ask me—your assistant, 
Green, questions about the data, such as air quality assessments or suggestions 
for improving air quality.

At the bottom of the Menu Bar are **Other Functions**, including 
**Profile**, where you can view details about our development team. 
The **Settings** and **Log Out** options are still under development.
"""
website_guidance = website_guidance.replace('\n', '')


Data = fetch_data2()
print(type(Data))

#Data = "Here is latest data come from the sensor, read this: " + Data




Chat = model.start_chat(
    history=[
        {"role": "user", "parts": system_message1},
        {"role": "model", "parts": "Ok"},
        {"role": "user", "parts": website_guidance},
        {"role": "model", "parts": "Sure"},
        {"role": "user", "parts": "What is the latest sensor information?"},
        {"role": "model", "parts": Data},
   ]
)



def chatbot_response(user_input):
    Chat.send_message(user_input)
    return Chat.last.text
