import dbConnection from '../config/database.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const setSignUpUser = (result) => {
    dbConnection.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${dbConnection.escape(
        req.body.username
      )});`, (err, results) => {
        // if(err) {
        //     console.log(err);
        //     result(err, null);
        // } else {
        //     result(null, results);
        // }
        if (result.length) {
            return res.status(409).send({
                msg: 'This username is already in use!'
            });
        } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({msg: err});
                } else {
                // has hashed pw => add to database
                db.query(
                  `INSERT INTO users (id, username, password, registered) VALUES ('${uuidv4()}', ${db.escape(
                    req.body.username
                  )}, ${db.escape(hash)}, now())`,
                  (err, result) => {
                    if (err) {
                      throw err;
                      return res.status(400).send({
                        msg: err
                      });
                    }
                    return res.status(201).send({
                      msg: 'Registered!'
                    });
                  }
                );
              }
            });
          }
    })
}