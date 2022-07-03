import express from "express";
import cors from "cors";
//

import Router from "./routes/routes.js";
// import deserializeUser from "./middleware/deserializeUser";

const app = express();
//Middleware
//body-parser new way usage
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// app.use(deserializeUser);

let corsOpts = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}
app.use(cors(corsOpts));

app.use(Router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

// routes(app);