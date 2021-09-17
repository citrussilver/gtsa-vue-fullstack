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
    origin: '*',
    methods: ['GET', 'POST']
}
app.use(cors(corsOpts));

app.use(Router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});