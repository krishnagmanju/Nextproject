import mongoose from "mongoose";

export async function connectDB(){
   // mongoose.set("strictQuery", false);
   await mongoose.connect('mongodb+srv://manjugk:cY4QRusuwWHcXEH3@myapp.0tgh7ao.mongodb.net/test')
   console.log('database connected')
}
// mongodb+srv://manju_gk:<password>@myapp.vwfewbz.mongodb.net/test
// mongodb+srv://manju_gk:Manju@26@myapp.vwfewbz.mongodb.net/transaction?retryWrites=true&w=majority