const admin = require('firebase-admin');
const axios = require('axios');
const cron = require('node-cron');

require('dotenv').config();

// Firebase Admin Initialization
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fireship-dd0fc-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your Firebase URL
});

const db = admin.database();
//const stationName = 'Hai BaTrung'; // Example station name
const stationApi = 'https://device.iqair.com/v2/668505f27c0fe1ce46dc81a2/'; // Replace with your actual device API URL
const IQAIR_API_KEY = process.env.IQAIR_API_KEY;

// Function to Fetch and Save Data to Firebase
const fetchAndSaveData = async () => {
    try {
      // Fetch data from the station API
      console.log('Fetching data from Station API...');
      const response = await axios.get(stationApi);
      const data = response.data;
  
      console.log('Data fetched successfully:', data);
  
      // Path in Firebase Realtime Database
      const stationPath = `stations/${data.name.replace(/\s+/g, '_')}`; // Use station name as the key
  
      // Save data to Firebase
      await db.ref(stationPath).set(data);
  
      console.log(`Data saved to Firebase at path: ${stationPath}`);
    } catch (error) {
      console.error('Error fetching or saving data:', error.message);
    }
  };
  
  // Run the function
fetchAndSaveData();

const fetchAndSaveHistoricalData = async () => {
    try {
        console.log('Fetching historical data from Station API...');
        const response = await axios.get(stationApi);
        const data = response.data;
        
        if (!data || !data.historical || !data.historical.daily) {
            console.error('No daily historical data available');
            return;
        }

        // Get last 30 days of daily data
        const dailyData = data.historical.daily
            .slice(0, 30)
            .sort((a, b) => new Date(a.ts) - new Date(b.ts));

        console.log(`Processing ${dailyData.length} daily readings`);

        // Create a structured object
        const stationName = data.name.replace(/\s+/g, '_');
        const formattedData = {};
        
        dailyData.forEach(reading => {
            const timestamp = new Date(reading.ts).getTime();
            formattedData[timestamp] = reading;
        });

        // Save to Firebase
        const updates = {
            [`stations/${stationName}/daily_30d`]: formattedData,
            [`stations/${stationName}/lastUpdated`]: Date.now()
        };

        await db.ref().update(updates);
        
        console.log('30-day historical data saved successfully');
        console.log('Time range:', {
            from: new Date(dailyData[0]?.ts).toISOString(),
            to: new Date(dailyData[dailyData.length - 1]?.ts).toISOString()
        });
        console.log('Total data points:', dailyData.length);

    } catch (error) {
        console.error('Error fetching or saving historical data:', error.message);
        if (error.response) {
            console.error('Error Response:', error.response.data);
        }
        // Implement retry logic
        await retryOperation(fetchAndSaveHistoricalData);
    }
};

// Retry logic
const retryOperation = async (operation, maxRetries = 3, delay = 5000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            await operation();
            return; // Success, exit retry loop
        } catch (error) {
            console.error(`Retry ${i + 1}/${maxRetries} failed:`, error.message);
            if (i === maxRetries - 1) {
                console.error('Max retries reached. Operation failed.');
            }
        }
    }
};

// Schedule updates using cron
const scheduleHistoricalDataUpdate = () => {
    // Run every hour at minute 0
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled historical data update...');
        await fetchAndSaveHistoricalData();
    });
    
    // Also run immediately on startup
    fetchAndSaveHistoricalData();
    
    console.log('Historical data updates scheduled (hourly)');
};

// Error handling for the entire process
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Implement notification system here if needed
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Implement notification system here if needed
});

// Start the scheduling
scheduleHistoricalDataUpdate();

