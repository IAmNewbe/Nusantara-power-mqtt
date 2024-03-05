const mqtt = require('mqtt');

// Define the MQTT broker URL
const brokerUrl = "mqtt://mqtt-cleen.plnnusantarapower.co.id"

// Define the topic to which you want to publish the message
// const topic = `/oneM2M/req/${access_key}/antares-cse/json`;
const topics = [
  "UPMKR/GTG12/MOTOR/88BT/Tegangan_R",
  "UPMKR/GTG12/MOTOR/88BT/Tegangan_S",
  "UPMKR/GTG12/MOTOR/88BT/Tegangan_T",
  "UPMKR/GTG12/MOTOR/88BT/Tegangan_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/Arus_R",
  "UPMKR/GTG12/MOTOR/88BT/Arus_S",
  "UPMKR/GTG12/MOTOR/88BT/Arus_T",
  "UPMKR/GTG12/MOTOR/88BT/Arus_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/Watt_R",
  "UPMKR/GTG12/MOTOR/88BT/Watt_S",
  "UPMKR/GTG12/MOTOR/88BT/Watt_T",
  "UPMKR/GTG12/MOTOR/88BT/Watt_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/Freq_R",
  "UPMKR/GTG12/MOTOR/88BT/Freq_S",
  "UPMKR/GTG12/MOTOR/88BT/Freq_T",
  "UPMKR/GTG12/MOTOR/88BT/Freq_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/pf_R",
  "UPMKR/GTG12/MOTOR/88BT/pf_S",
  "UPMKR/GTG12/MOTOR/88BT/pf_T",
  "UPMKR/GTG12/MOTOR/88BT/pf_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/Energy_R",
  "UPMKR/GTG12/MOTOR/88BT/Energy_S",
  "UPMKR/GTG12/MOTOR/88BT/Energy_T",
  "UPMKR/GTG12/MOTOR/88BT/Energy_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/VA_R",
  "UPMKR/GTG12/MOTOR/88BT/VA_S",
  "UPMKR/GTG12/MOTOR/88BT/VA_T",
  "UPMKR/GTG12/MOTOR/88BT/VA_3Phase",
  "UPMKR/GTG12/MOTOR/88BT/VAR_R",
  "UPMKR/GTG12/MOTOR/88BT/VAR_S",
  "UPMKR/GTG12/MOTOR/88BT/VAR_T",
  "UPMKR/GTG12/MOTOR/88BT/VAR_3Phase",
  ];

// Create an MQTT client
const client = mqtt.connect(brokerUrl);

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Function to publish a message
  const publishMessage = () => {
    
    let temp = Math.floor(Math.random()*100);

    const data2 = {
      "temp": temp
    }

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data2);
        // `{\"temp\":${temp},\"humidity\":${hum}}`
    // Publish the message to the specified topic
     // Publish a message to each topic
     topics.forEach(topic => {
      const message = 'Hello from MQTT publisher!';
      client.publish(topic, jsonData, (err) => {
          if (err) {
              console.error('Error publishing message:', err);
          } else {
              console.log(`Published message "${jsonData}" to topic "${topic}"`);
          }
      });
  });
  };

  // Publish a message every 1 seconds
  const intervalId = setInterval(publishMessage, 1000);

  // Optionally, stop the interval after a certain period (e.g., 10 seconds)
  setTimeout(() => {
    clearInterval(intervalId);
    client.end(); // Close the MQTT connection
  }, 100000);
});

// Handle errors
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

// Handle disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});