import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoute.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const port = process.env.PORT || 5000
app.get('/' , (req, res) =>{
    res.send('Api is Working')
})

//connect to db and cloudinary
connectDb()
connectCloudinary()
//middlewares
app.use(express.json())

app.use(cors({
  origin:"*", // Allow frontend domain
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Explicitly allow 'token' header
}));

//apiEndpoints
app.use('/api/user/', userRoutes)
app.use('/api/admin/', adminRoutes)


app.listen(port , () =>[
    console.log(`Server is running on Port: ${port}`)
])