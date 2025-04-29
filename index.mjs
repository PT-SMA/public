import handler from 'serve-handler';
import http from 'http';
import path from 'path';

const server = http.createServer((req, res) => {
  return handler(req, res, {
    public: path.resolve('public'),
    headers: [{
      source: "**/*.@(jpg|jpeg|png)",
      headers: [
        {
          key: "Cache-Control",
          value: "max-age=7200"
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*"
        }
      ]
    }],
  });
});

server.listen(8869, () => {
  console.log("static fileserver is running");
})
