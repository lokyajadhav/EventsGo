import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './routes'
import mongoose from 'mongoose'

const app = express();

const url = "mongodb+srv://Lokya_Jadhav:Lokyanaik9985@cluster0.cz6ew.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
.then((res: any) => console.log("successfully connected"))
  .catch((err: any) => {
     console.log(err.message)
  });

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(({ origin: ['http://192.168.103.143:3000','http://localhost:3000','https://realshiva.rocks','https://sgc-events.turntbloke.tech/'], credentials: true })));
app.use(cookieParser())
app.use('/',routes)

export default app;