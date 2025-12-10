import handler from "serve-handler";
import http from "http";
import path from "path";
import cluster from "cluster";
import { availableParallelism } from "os";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log("Starting cluster");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(worker.process.pid, "died");
    cluster.fork();
  });
} else {
  const server = http.createServer((req, res) => {
    return handler(req, res, {
      public: path.resolve("public"),
      headers: [
        {
          source: "**/*.@(jpg|jpeg|png)",
          headers: [
            {
              key: "Cache-Control",
              value: "max-age=7200",
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
          ],
        },
      ],
    });
  });

  server.listen(8869, () => {
    console.log("static fileserver is running on port 8869");
  });
}
