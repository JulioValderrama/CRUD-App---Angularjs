const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        // mongodb connection string
        const connection = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected : ${connection.connection.host}`);
        console.log(`MongoDB connected to Database: ${connection.connection.db}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
