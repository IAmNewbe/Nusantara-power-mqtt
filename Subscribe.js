const mqtt = require('mqtt');
require('dotenv').config();

// Replace these with your MQTT broker details
const brokerUrl = "mqtt://mqtt-cleen.plnnusantarapower.co.id";

// Create an MQTT client instance
const client = mqtt.connect(brokerUrl);
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

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  // Subscribe to each topic
  topics.forEach(topic => {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Error subscribing to topic:', err);
        } else {
            console.log('Subscribed to topic:', topic);
        }
    });
});

});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Disconnect after receiving a message
  // client.end();
});

// Handle disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

// Handle errors
client.on('error', (err) => {
  console.error(`MQTT error: ${err}`);
});
