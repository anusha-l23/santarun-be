const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const eventRoutes = require("./routes/Event");
const couponRoutes = require("./routes/Coupon")
const cors = require("cors");

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors())
app.use('/santarun', userRoutes);
app.use('/santarun', eventRoutes);
app.use('/santarun', couponRoutes);

// app.use("/", (req, res)=>{
//   res.send("santarun application is running...")
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
