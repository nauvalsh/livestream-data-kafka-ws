console.log("Producer");
const { Kafka, CompressionTypes } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.100.38:9092"],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "test",
    compression: CompressionTypes.GZIP,
    messages: [{ value: `Hello KafkaJS user! ${Date.now()}` }, { value: `Hello Nauva! ${Date.now()}` }],
  });

  console.log("Sending Message...");
};

setInterval(() => {
  run().catch(console.error);
}, 5000);
