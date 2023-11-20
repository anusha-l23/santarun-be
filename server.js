const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors())
app.use('/santarun', userRoutes);

app.use("/", (req, res)=>{
  res.send("santarun application is running...")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
