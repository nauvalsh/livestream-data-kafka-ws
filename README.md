# node-kafka-producer-consumer

A kafka producer/consumer proof of concept using node.

![Screen Shot 2021-04-20 at 09 56 47](https://user-images.githubusercontent.com/17026751/115368228-cbcd0000-a1be-11eb-9d17-6ada1ad5ff98.png)

## Prerequisites

- `node`
- `docker`

## Running locally

- `npm install` - installs npm dependencies.
- `./scripts/start-kafka.sh` - starts kafka inside docker container. (old)
- `./scripts/create-topic.sh` - creates kafka topic. (old)
- `npm run start:producer` - starts producer.
- `npm run start:consumer` - starts consumer.

- `sh ./scripts/start-kafka.sh` (New) starts kafka inside docker container.
- `docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --partitions 1 --replication-factor 1 --topic test --bootstrap-server localhost:9092` (New) creates topic

![Contoh Producer Consumer](img/contoh-produce-consume.JPG)
