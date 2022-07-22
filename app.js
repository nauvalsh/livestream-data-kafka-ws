var WebSocketServer = require(`websocket`).server;
var http = require(`http`);
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.100.38:9092"],
});

const consumer = kafka.consumer({ groupId: "app1" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });
})();

var server = http.createServer(function (request, response) {
  console.log(` Request recieved : ` + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, function () {
  console.log(`Listening on port : 8080`);
});

webSocketServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function iSOriginAllowed(origin) {
  return true;
}

webSocketServer.on(`request`, async function (request) {
  if (!iSOriginAllowed(request.origin)) {
    request.reject();
    console.log(` Connection from : ` + request.origin + ` rejected.`);
    return;
  }

  var connection = request.accept(`echo-protocol`, request.origin);
  console.log(` Connection accepted : ` + request.origin);
  connection.on(`message`, function (message) {
    if (message.type === `utf8`) {
      console.log(`Received Message: ` + message.utf8Data);
    }
  });

  await consumer
    .run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        //   console.log(JSON.parse(message.value).data);

        connection.sendUTF(JSON.parse(message.value).data);
      },
    })
    .catch((e) => console.log(e));

  connection.on(`close`, function (reasonCode, description) {
    console.log(`Connection ` + connection.remoteAddress + ` disconnected.`);
  });
});
