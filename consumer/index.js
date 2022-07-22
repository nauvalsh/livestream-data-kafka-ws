console.log("Consumer");

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["192.168.100.38:9092"],
});

const consumer = kafka.consumer({ groupId: "1" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
