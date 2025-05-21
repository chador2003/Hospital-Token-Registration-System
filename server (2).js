const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// console.log("This is the password: ",process.env.DATABASE);
// const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD)

// mongoose.connect(DB).then((con) => {
//     console.log(con.connections);
//     console.log('DB connection successful');

// }).catch(error  => console.log(error));

//  ================= for Local Database =============================
const local_DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(local_DB)
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((error) => console.log(error));

// starting the port server on port 4001
const port = 4001;
app.listen(port, () => {
  console.log(`app is running on port ${port} ... `);
});
