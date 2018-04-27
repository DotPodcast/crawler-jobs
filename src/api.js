import Hapi from 'hapi';

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return {
      status: 200,
    };
  }
});

export default function() {
  server.start();
};
