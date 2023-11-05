const User = require("../model/user");
const jwt = require('jsonwebtoken');


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            if (userExist.password === password) {
                const token = jwt.sign({ id: userExist._id, email: userExist.email }, 'iconnect_technology');
                res.cookie('token', token);

                res.send({ msg: "Login Successfully", id: userExist._id, user: userExist.Name, email: userExist.email, token: token });
            } else {
                res.send({ error: "Password Not Match" })
            }

        } else {
            res.send({ error: "User not Found" });
        }
    } catch (error) {
        console.log({ error: 'something went wrong' });
    }
}

const Register = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password, Name } = req.body;
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            res.send({ msg: 'user already exist' });
        } else {
            const adduser = new User({
                email: email,
                password: password,
                Name: Name

            });
            const result = await adduser.save();
            if (result) {
                res.send({ msg: "user registered successfuly" });
            } else {
                res.send({ error: 'user not registered' });
            }
        }

    } catch (error) {
        res.send({ error: 'something went wrong' });
    }
}

module.exports = { Login, Register };