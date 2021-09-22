import { setSignUpUser } from '../models/signUpUserModel.js'


export const signUpUser = (req, res) => {
    setSignUpUser((err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}