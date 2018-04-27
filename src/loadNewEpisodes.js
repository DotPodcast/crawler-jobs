import winston from 'winston';
import amqplib from 'amqplib';
import es from './es';
import config from './config';


const loadNewEpisodes = async () => {
  const uriQ = config.get('rabbit:uriQueue');

  // Connect to RabbitMQ
  const conn = await amqplib.connect(`amqp://${config.get('rabbit:host')}`);

  const ch = await conn.createChannel()
  ch.assertQueue(uriQ, { durable: true });
  winston.log('info', 'Input Queue is Present');

  return await es.forEachPodcast(async (podcast) => {
    winston.info(`Sending message to get new episodes for ${podcast.items_url}`);
    await ch.sendToQueue(uriQ, Buffer.from(JSON.stringify({
      uri: podcast.items_url,
      singlePage: true,
      mergeData: {
        podcast,
      },
    })), { persistent: true });
  });
}

export default loadNewEpisodes;
