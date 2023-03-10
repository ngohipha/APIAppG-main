const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");


mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_DB_CONFIG.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("Database Connected");
}, 
(error)=>{
    console.log("Database can't be connected :" +error);
});
// dieu hanh trung gian cua express 
app.use(express.json());
app.use("/uploads" , express.static("uploads"));
app.use("/api" , require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function (){
    console.log("Ready to Go!");
})