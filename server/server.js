// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";

const app = express();
//Middleware
//body-parser new way usage
app.use(express.urlencoded({extended: true}));
app.use(express.json())

let corsOpts = {
    origin: ['http://localhost:5000', 'https://localhost:8080', 'http://192.168.18.28:8080/', 'http://192.168.18.28:5000/' ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}
app.use(cors(corsOpts));

app.use(Router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});