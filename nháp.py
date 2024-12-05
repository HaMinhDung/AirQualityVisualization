"""import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

# Initialize Firebase Admin
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
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://fireship-dd0fc-default-rtdb.asia-southeast1.firebasedatabase.app'
})

def fetch_data():
    try:
        ref = db.reference('stations/AirVisual_Outdoor_-_VinOutdoor/historical/daily')
        data = ref.get()
        
        if not data:
            print("No data returned from Firebase")
            return None
        
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
        print(f"Error fetching data: {e}")
        return None
system_message1 = 
SYSTEM MESSAGE: Your name is Green, you are a voice assistant for an air quality monitoring website. 
Respond concisely and accurately to questions about air quality data and guide 
users in using the website. Prioritize facts, clarity, and brevity in your answers. 
You might be asked in different languages, especially Vietnamese and English, keep that in mind.


if __name__ == '__main__':
    a = fetch_data()
    print(a)
    print(type(a))
    print(type(system_message1))

"""