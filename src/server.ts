import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
