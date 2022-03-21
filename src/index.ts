import fastify from "fastify";

const app = fastify();

app.get("/ping", async (req, res) => {
  return "pong\n";
});

app.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
