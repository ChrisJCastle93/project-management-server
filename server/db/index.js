const mongoose = require('mongoose')
const MONGO_URI = "mongodb://127.0.0.1:27017/project-management-server";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => {
    console.log(`Connected to Mongo! Database name: "${m.connections[0].name}"`);
    return m.connection.getClient();
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

