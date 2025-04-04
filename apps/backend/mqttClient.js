// mqttClient.js
import mqtt from 'mqtt'

const options = {
    host: '114.132.239.59',
    port: 1883,
    username: 'server_listener',
    password: 'Luo112781',
    clientId: 'backend-receiver',
    clean: true,
};

const client = mqtt.connect(options);

export const initMQTT = (messageHandler) => {
  client.on('connect', () => {
    console.log('✅ MQTT connected');
    client.subscribe(['chengtong/data/#', 'chengtong/status/#'], (err) => {
      if (!err) console.log('Subscribed to chengtong topics.');
      else console.error('Subscription error:', err);
    });
  });

  client.on('message', (topic, message) => {
    let payload;
    try {
      payload = JSON.parse(message.toString());
    } catch (err) {
      console.error('Invalid JSON payload', err);
      return;
    }
    messageHandler(topic, payload);
  });

  client.on('error', (err) => {
    console.error('MQTT error:', err);
  });
};
