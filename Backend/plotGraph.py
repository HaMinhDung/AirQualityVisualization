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
    "private_key_id": "289028618040f5fb7294cb873faaf1157bd0e465",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC91O0bvPKl+2tT\n3Mm7Fs10l9IuU9+avWDY8E8R/cmvIxos9NzMqwl+jmq/pGG2y7BJQtHEBNEuskWd\nQyu1cpiJ+7rrn/gn8ALWnoT0spQp/gVIREFrkD7wQ1JB4g1y5lxdEsVmeXWFV9Ik\nQ6H0ETheQ9SL1ivArXyYSjpdKKOmRV5Adjn3u2CM0yDjbveDampfmyj5mqfjnSfT\no94CF8gVUYhPFRaA7EOIriFHNBc49hsgHLDcFMupjz5DruhkIsA02T/2AG+1dpPw\nU6LjpHc7fetGZTz2NHe9iltY7smQ2Ztho4ZMBZhGNlktZkswZWG5XUT2i7dvNEPj\nULESW85VAgMBAAECggEACLc6/7gIKAjIH7yWYomke0LxOoFNVex2At/dsYTGes0Q\nyZmgfaEouW/OhOgGOH9Xo7V2rhpOhGdY/OR1oEoXqNYu+dyJZ0QEzVfP4PBGDzuD\ngJLpsgeYbC2bHD1Fws3C1d8jwxW2iJ3EnzefuvYDcYiJvLXjomAUxWU7EsXn5Z1b\ndjemTSsNImfwjkMIilHCijcISnmYaRI+pjU9vh8ckPo/4oM7RvHW7kgwJQ/xtnwh\np6l+cJw2tkBtlpCqn2D75DfBiWIjgY0mlu7mbNWlhxVXZXkysxXEzB0NH8l1bve1\nH9xZ/QRb4xSgjxibkE1K8UnYaIylsVJC6PkGxv3eLQKBgQDoOgGEqbbi6NbLqaRd\ngTKxZlfaJjzECOxXHQGZ0wSNMIPJtqAKToGhS1FjU+fakhPwkQSZy/93lNBXD0Mg\nW28+Emu66BizSM5jSA/XxbE8BOs7kfX/UXYpLkn/Kx+6+XOT16uMmxoaNLyQzrdS\nVC39qylecIPKYc5zwSSCfN2RnwKBgQDRQ99v5YL55ph0WOE/y7383j6V6GQGgmix\nXbyPRujNecqF9ClYlQMasy9xsvif0QKneJ7uIaONNsPZ7uP7E7WyhtmW/nLZH0Pe\n+aSU8d+h7OgQXopH6fUFqFzBhU35inRmWkjP+LI+OOh//e99gTHsz8YBX+lG+4kE\nAt6G5LsjiwKBgCghJfQD09vAOqX1CbcyxUzMj6/d3bBOjnC7TXSEd4vib1OjIGLH\nkDUMK+NLM4yco591n+Ln0pyadaoltAbaZg3G5yDkTKhmk2uqnzo9KlRh0Th5D5Zw\nQEf7fMQAcro/sw5APZ/NiaQvqsonPpyWeWAVfM+aB9woLKHqJWH7K9qnAoGAY3LW\n941h3jMZFom6mh/QLSDNK16iUnmdGVVLq+dt8WBEv74V/BPswr6O+ICuKP0iPsZS\n+SYhXJW/I42k6IgoXCw7scdAezChh5CqB2Ke/YvhiQ30t1JW8BZf5lPch4+l25Ji\ncftlca6Hx3O9Ya6JNFpVZgfXi7U0GyTl7cM7sBsCgYAFCzEuVb3V/nO9yJoQRqbE\nF549KqVNepfSnm50ovYqdMTaEGKkPlQ8TwmdB1yN7zCBEly9L33ndNcidGqB2lef\nTqvYwZ1RG+J6JO02jEUiYJyVyXt+R2lmEjyaJYKbdTQ6JlEckCc9VfA3Rr/Me4f2\nRrlttNJ8Qz1NeQVW7tH/tQ==\n-----END PRIVATE KEY-----\n",
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
                except (KeyError, ValueError) as e:
                    print(f"Skipping invalid data point: {e}")
                    continue
        
        return {
            'dates': dates,
            'temperature': temperature,
            'humidity': humidity,
            'pm25': pm25
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

    # Create subplots for all three graphs
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 18))
    
    plot_pm25(data['dates'], data['pm25'], ax1)
    plot_temperature(data['dates'], data['temperature'], ax2)
    plot_humidity(data['dates'], data['humidity'], ax3)
    
    plt.tight_layout()
    plt.close(fig)  # Clean up

def save_all_graphs():
    """Generate and save all graphs as PNG files"""
    data = fetch_data()
    if not data:
        raise Exception("No data available")

    # Create directory for graphs if it doesn't exist
    graphs_folder = "./AirQualityVisualization/Backend/static/graphs"
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
        # Create three separate figures
        # PM2.5 Graph
        fig1, ax1 = plt.subplots(figsize=(12, 6))
        plot_pm25(data['dates'], data['pm25'], ax1)
        
        # Temperature Graph
        fig2, ax2 = plt.subplots(figsize=(12, 6))
        plot_temperature(data['dates'], data['temperature'], ax2)
        
        # Humidity Graph
        fig3, ax3 = plt.subplots(figsize=(12, 6))
        plot_humidity(data['dates'], data['humidity'], ax3)
        
        plt.show()
        
        # Clean up after showing
        plt.close(fig1)
        plt.close(fig2)
        plt.close(fig3)
    else:
        print("No data available")

