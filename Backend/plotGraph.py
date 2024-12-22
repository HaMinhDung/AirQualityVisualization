import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import pandas as pd
import os

# Initialize Firebase Admin
# Initialize Firebase Admin with hardcoded credentials
service_account = {
  "type": "service_account",
  "project_id": "fireship-dd0fc",
  "private_key_id": "1f2f1211a2ca16d97e422a38d0efe47d83186c8d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTAqU1uauKgDSK\nKgaSe3417m9f/uv5Gcw66Uoo1n/zhzwXeSkZjLhaJuDXxUl3s2i5ZcoqCy1gutw4\nf7pr3HQu07s0TS8Z/8S5j2mvUBMAsUyAWm8xGddGGq5jNJkvmRLnXrq787rvO2Tl\nfeLOF1Tg1PvFW1FrTj0FbKtEJuuBb90bUwq4Pb3BWS8XBikUf/WcHAO8l2NhLEYJ\nvTd3FVYa4Jhv9/5K/39N15PXkuiKdX1nQsw/NR8rnH7kZ7PviCSA8xGG9eqScFdN\nfdb+nPqC0kUSTk1wxlv6prVGZy9WD4qYrV+DyPTH5WZVw76ICKSoM32dmAYwgdQI\ncXbHtNipAgMBAAECggEALHDCx5xypmI+P7wXk4WAcEY9ZewWoo1xZyep0vGQ6Wnq\nuP/X9FDNU/dnxeJuZKCYGl+SfyY02AZ01yGJldylRJieAWAJypa+fgfD/4q5y95N\nDYoJDfNNV/Rt3jCC1Fg2VjoVQgcabgJq7FMjUoDMGFFaMN17nfAfUzn4Bhir3csh\nJKNqTULgfnZbZz8aKwbZH3EAnfHGyrlX1tFkjS0V+G2L0fVCNCaj9mzqQbv1IKtk\nQLE/jTcUciw0yiX6kXU3Z3KTUR2Vf4ChvOSqDDjgO93GNIApgKFxPV9njnSpAh2n\nPSCq+Htt5jBgYbIwWm7DDNGsuKnU+wDd/ff6xUu+5wKBgQDPQOYdeQhMi0fvXXxH\nqrdWWeKXCwtGMl4WWdlnb2b+kCxvzQtAAmi71TEPb1z0pNe7ic/TI9aFzKdMn5tS\nL5oIA62qc6JC4fJUcIKkmF/TlaKOglb1V5wFNf0AFoIFl70nhq2QZMoKptOrLBdK\nGEZ+Zx6x5b80MhV1uMTiIg7M7wKBgQC1lmXimNnyOxoy8ZstbIkq8IFcAx+6vPnD\nogwzi9fiNJEf42jyB69OmW2beHUGl9b52PwQSgCn1w6xCIpk2GZ6whRzlNE6PaKf\nORUhtLUZX/hzwndcORiIzcOzayoj2PiOfYd0SrlxLgHCRNJIYM5wMrc8LA7w+3+d\njx0w4X7j5wKBgQCS8/x2Z2xYAeY2tj25/zVSGBfPa3hKBMqr5Hd/nQEVfRrVBzlz\n4IFsteS8ggUSPpPtGPFwT5f7dTom3YDfTHtWNW19T9J8xAL0lnY7yQMhXpdNnuOT\nwNQS6c4DsvHsj0QC8767hIux88pgM7orwnyxgeLE1xe1JdILj8Ciau29pwKBgQCT\nY1GrTLmKHWK0etqjUfc7/R5iWr7ESWLI4ZzZseY2Wsh4g5LI8GfgejQ2/tytz0zU\nWsStTAOgN7RbCT2bgPIdLa5/6gixJxn59tEqHIzp3bXB79QF7On3EFyKIq9/jTqi\nHU12nLhMHzWaQ1YTHVAyTVfg5Tnza483idP9uunNfQKBgGJnN9uSVhrI/qJUxIbq\nOtAgnScOS1lVtqyXY1zksHVIpPjcYY+dI6qadeCDd9ouSgawWdOICN35yVB6QFHK\nQTwNQ2iG/DjG+5QWb3+eSqg09S2FjbXVkQSjHONBwR3FLlFJ9lCJpFNl2FGNbzZ9\nnnucgjbSzrgZdhqddCjrJEjv\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9znjh@fireship-dd0fc.iam.gserviceaccount.com",
  "client_id": "111968766451127202642",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9znjh%40fireship-dd0fc.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

  

cred = credentials.Certificate(service_account)
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://fireship-dd0fc-default-rtdb.asia-southeast1.firebasedatabase.app'
})

def fetch_data():
    try:
        ref = db.reference('stations/AirVisual_Outdoor_-_VinOutdoor/historical/daily')
        data = ref.get()
        
        if not data:
            print("No data returned from Firebase")
            return None
        
        # Convert data to lists
        dates = []
        temperature = []
        humidity = []
        pm25 = []
        pm10 = []  # New list for PM10
        pm1 = []    # New list for PM1
        pr = []     # New list for Pressure
        
        # Data is a list where each index represents a day
        for day_data in data:
            if day_data and isinstance(day_data, dict):  # Check if the data exists and is a dictionary
                try:
                    # Extract timestamp
                    timestamp = datetime.strptime(day_data['ts'], "%Y-%m-%dT%H:%M:%S.%fZ")
                    dates.append(timestamp)
                    
                    # Extract values
                    humidity.append(float(day_data['hm']))
                    temperature.append(float(day_data['tp']))
                    pm25.append(float(day_data['pm25']['conc']))  # Get PM2.5 concentration
                    pm10.append(float(day_data['pm10']['conc']))    # Get PM10 concentration
                    pm1.append(float(day_data['pm1']))              # Get PM1 concentration
                    pr.append(float(day_data['pr']))                 # Get Pressure
                except (KeyError, ValueError) as e:
                    print(f"Skipping invalid data point: {e}")
                    continue
        
        return {
            'dates': dates,
            'temperature': temperature,
            'humidity': humidity,
            'pm25': pm25,
            'pm10': pm10,  # Include PM10 in the return
            'pm1': pm1,    # Include PM1 in the return
            'pr': pr       # Include Pressure in the return
        }
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def plot_pm25(dates, pm25_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    # Define colors based on PM2.5 levels (based on AQI standards)
    colors = []
    for value in pm25_values:
        if value <= 12:  # Good
            colors.append('#00e400')
        elif value <= 35.4:  # Moderate
            colors.append('#ffff00')
        elif value <= 55.4:  # Unhealthy for Sensitive Groups
            colors.append('#ff7e00')
        elif value <= 150.4:  # Unhealthy
            colors.append('#ff0000')
        elif value <= 250.4:  # Very Unhealthy
            colors.append('#8f3f97')
        else:  # Hazardous
            colors.append('#7e0023')
    
    ax.bar(dates, pm25_values, color=colors, label='PM2.5')
    ax.set_title('PM2.5 Levels Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('PM2.5 (µg/m³)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def plot_temperature(dates, temp_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    # Define colors based on temperature ranges
    colors = []
    for value in temp_values:
        if value <= 10:  # Cold
            colors.append('#0066ff')
        elif value <= 20:  # Cool
            colors.append('#66ccff')
        elif value <= 25:  # Comfortable
            colors.append('#00cc66')
        elif value <= 30:  # Warm
            colors.append('#ff9933')
        else:  # Hot
            colors.append('#ff3300')
    
    ax.bar(dates, temp_values, color=colors, label='Temperature')
    ax.set_title('Temperature Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('Temperature (°C)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def plot_humidity(dates, humidity_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    # Define colors based on humidity levels
    colors = []
    for value in humidity_values:
        if value <= 30:  # Too dry
            colors.append('#ff9999')
        elif value <= 50:  # Comfortable
            colors.append('#99cc99')
        elif value <= 70:  # Humid
            colors.append('#9999ff')
        else:  # Very humid
            colors.append('#6666ff')
    
    ax.bar(dates, humidity_values, color=colors, label='Humidity')
    ax.set_title('Humidity Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('Humidity (%)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def plot_pm10(dates, pm10_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    ax.bar(dates, pm10_values, color='blue', label='PM10')
    ax.set_title('PM10 Levels Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('PM10 (µg/m³)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def plot_pm1(dates, pm1_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    ax.bar(dates, pm1_values, color='green', label='PM1')
    ax.set_title('PM1 Levels Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('PM1 (µg/m³)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def plot_pr(dates, pr_values, ax=None):
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    ax.bar(dates, pr_values, color='orange', label='Pressure')
    ax.set_title('Pressure Over Time')
    ax.set_xlabel('Time')
    ax.set_ylabel('Pressure (hPa)')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

def generate_graph(graph_type):
    data = fetch_data()
    if not data:
        raise Exception("No data available")

    # Create a new figure
    fig, ax = plt.subplots(figsize=(12, 6))
    
    if graph_type == 'pm25':
        plot_pm25(data['dates'], data['pm25'], ax)
    elif graph_type == 'temperature':
        plot_temperature(data['dates'], data['temperature'], ax)
    elif graph_type == 'humidity':
        plot_humidity(data['dates'], data['humidity'], ax)
    else:
        plt.close(fig)  # Clean up if invalid type
        raise ValueError(f"Invalid graph type: {graph_type}")
    
    # Save plot to bytes buffer
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)  # Clean up after saving
    return buf.getvalue()

def generate_all_graphs():
    """Generate all graphs initially"""
    data = fetch_data()
    if not data:
        raise Exception("No data available")

    # Create subplots for all graphs
    fig, (ax1, ax2, ax3, ax4, ax5) = plt.subplots(5, 1, figsize=(12, 30))
    
    plot_pm25(data['dates'], data['pm25'], ax1)
    plot_temperature(data['dates'], data['temperature'], ax2)
    plot_humidity(data['dates'], data['humidity'], ax3)
    plot_pm10(data['dates'], data['pm10'], ax4)  # New PM10 graph
    plot_pm1(data['dates'], data['pm1'], ax5)    # New PM1 graph
    
    plt.tight_layout()
    plt.close(fig)  # Clean up

def save_all_graphs():
    """Generate and save all graphs as PNG files"""
    data = fetch_data()
    if not data:
        raise Exception("No data available")

    # Create directory for graphs if it doesn't exist
    graphs_folder = "static/graphs"
    os.makedirs(graphs_folder, exist_ok=True)

    # Generate and save PM2.5 graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_pm25(data['dates'], data['pm25'], ax)
    fig.savefig(os.path.join(graphs_folder, 'pm25.png'), bbox_inches='tight')
    plt.close(fig)

    # Generate and save Temperature graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_temperature(data['dates'], data['temperature'], ax)
    fig.savefig(os.path.join(graphs_folder, 'temperature.png'), bbox_inches='tight')
    plt.close(fig)

    # Generate and save Humidity graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_humidity(data['dates'], data['humidity'], ax)
    fig.savefig(os.path.join(graphs_folder, 'humidity.png'), bbox_inches='tight')
    plt.close(fig)

    # Generate and save PM10 graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_pm10(data['dates'], data['pm10'], ax)
    fig.savefig(os.path.join(graphs_folder, 'pm10.png'), bbox_inches='tight')
    plt.close(fig)

    # Generate and save PM1 graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_pm1(data['dates'], data['pm1'], ax)
    fig.savefig(os.path.join(graphs_folder, 'pm1.png'), bbox_inches='tight')
    plt.close(fig)

    # Generate and save Pressure graph
    fig, ax = plt.subplots(figsize=(12, 6))
    plot_pr(data['dates'], data['pr'], ax)
    fig.savefig(os.path.join(graphs_folder, 'pressure.png'), bbox_inches='tight')
    plt.close(fig) 

def fetch_data2():
    try:
        ref = db.reference('stations/AirVisual_Outdoor_-_VinOutdoor/historical/daily')
        data = ref.get()
        
        if not data:
            return "No data returned from Firebase"
        
        results = []  # Initialize a list to store the results
        for day_data in data:
            if day_data and isinstance(day_data, dict):
                try:
                    timestamp = datetime.strptime(day_data['ts'], "%Y-%m-%dT%H:%M:%S.%fZ")
                    humidity = float(day_data['hm'])
                    temperature = float(day_data['tp'])
                    pm25_conc = float(day_data['pm25']['conc'])
                    pm25_aqius = day_data['pm25']['aqius']
                    pm25_aqicn = day_data['pm25']['aqicn']
                    pm10_conc = float(day_data['pm10']['conc'])
                    pm10_aqius = day_data['pm10']['aqius']
                    pm10_aqicn = day_data['pm10']['aqicn']
                    pm1 = float(day_data['pm1'])
                    pr = float(day_data['pr'])

                    results.append(f"Date: {timestamp}, Temperature: {temperature}, Humidity: {humidity}, PM2.5: {pm25_conc}, PM2.5 AQI US: {pm25_aqius}, PM2.5 AQI CN: {pm25_aqicn}, PM10: {pm10_conc}, PM10 AQI US: {pm10_aqius}, PM10 AQI CN: {pm10_aqicn}, PM1: {pm1}, Pressure: {pr}")
                except (KeyError, ValueError) as e:
                    print(f"Skipping invalid data point: {e}")
                    continue
        return "\n".join(results)  # Return the collected results as a single string
    except Exception as e:
        return f"Error fetching data: {e}"
    
if __name__ == '__main__':
    # Test database connection
    ref = db.reference('/')
    print("Database contents:", ref.get())
    
    # Then try your regular code
    data = fetch_data()
 
    if data:
        # Create figures for all graphs
        # PM2.5 Graph
        fig1, ax1 = plt.subplots(figsize=(12, 6))
        plot_pm25(data['dates'], data['pm25'], ax1)
        
        # Temperature Graph
        fig2, ax2 = plt.subplots(figsize=(12, 6))
        plot_temperature(data['dates'], data['temperature'], ax2)
        
        # Humidity Graph
        fig3, ax3 = plt.subplots(figsize=(12, 6))
        plot_humidity(data['dates'], data['humidity'], ax3)

        # PM10 Graph
        fig4, ax4 = plt.subplots(figsize=(12, 6))
        plot_pm10(data['dates'], data['pm10'], ax4)

        # PM1 Graph
        fig5, ax5 = plt.subplots(figsize=(12, 6))
        plot_pm1(data['dates'], data['pm1'], ax5)

        # Pressure Graph
        fig6, ax6 = plt.subplots(figsize=(12, 6))
        plot_pr(data['dates'], data['pr'], ax6)
        
        plt.show()
        
        # Clean up after showing
        plt.close(fig1)
        plt.close(fig2)
        plt.close(fig3)
        plt.close(fig4)
        plt.close(fig5)
        plt.close(fig6)
    else:
        print("No data available")

