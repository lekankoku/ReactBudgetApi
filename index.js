const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const account = require("./routes/account");
const app = express();
const transaction = require("./routes/transaction");
const config = require("config");

// if (!config.get("jwtPrivateKey")) {
//     process.exit(1);
// }

mongoose
    .connect("mongodb://localhost/playy")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));
mongoose.set("useFindAndModify", false);
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/account", account);
app.use("/api/transaction", transaction);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("listening");
});
