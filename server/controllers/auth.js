import { setHandleLogin } from '../models/authModel.js'
import jwt from "jsonwebtoken"

export const handlelogin = (req, res) => {

    // temporary variables for testing
    const USERNAME = 'ganyu';
    const PASSWORD = 'xyz789';

    const { username, password } = req.body;

    if( username == USERNAME && password == PASSWORD) {
        // 200 OK
        // pattern for a user model
        const user = {
            id: 1,
            name: "ganyu",
            username: "ganyu",
        };
        const token = jwt.sign(user, process.env.JWT_KEY);
        res.json({
            token,
            user
        });
    } else {
        res.status(403);
        res.json({
            message: "Invalid login information"
        })
    }
}