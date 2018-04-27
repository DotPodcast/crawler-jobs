import elasticsearch from 'elasticsearch';
import winston from 'winston';
import config from './config';

const client = new elasticsearch.Client({
  host: [
    {
      host: config.get('es:host'),
      port: config.get('es:port'),
      log: 'info',
      protocol: config.get('es:protocol'),
      auth: `${config.get('es:username')}:${config.get('es:password')}`,
    }
  ]
});

const forEachPodcast = (fn) => {
  return new Promise((resolve, reject) => {
    let processedCount = 0;
    client.search({
      index: 'podcasts',
      scroll: '30s',
    }, function processPage(error, response) {
      if(error) {
        return reject({
          message: `Failed after processing ${processedCount} records.`,
          error,
        });
      }
      // Execute
      response.hits.hits.forEach((hit) => {
        fn(hit._source);
        processedCount += 1;
      });

      if (response.hits.total > processedCount) {
        client.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
        }, processPage);
      } else {
        winston.info(`Processed each of ${processedCount} podcasts.`)
        return resolve();
      }
    });
  })
};

export default {
  forEachPodcast,
};
