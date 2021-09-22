import { setHandleLogin } from '../models/authModel.js'

export const handlelogin = (req, res) => {
    setHandleLogin((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
    // const USERNAME = "rushia"
    // const PASSWORD = "7676"

    // const { username, password } = req.body;
    // if (username === USERNAME && password === PASSWORD) {
    //     const user = {
    //         id: 1,
    //         name: "Uruha Rushia",
    //         username: "rushia",
    //     };
    //     const token = jwt.sign(user, process.env.JWT_KEY);
    //     res.json({
    //         token,
    //         user,
    //     });
    // } else {
    //     res.status(403);
    //     res.json({
    //         message: "wrong login credentials",
    //     });
    // }

    // processLogin((err, results) => {
    //     if(err){
    //         res.send(err);
    //     } else {
    //         res.json(results);
    //     }
    // });
}