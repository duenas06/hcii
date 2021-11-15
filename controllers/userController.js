const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        var type = 1;
        data.type = type;
        await firestore.collection('AccountID').doc(data.username).set({username: data.username,type: data.type});
        await firestore.collection('userr').doc(data.username).set(data);
        res.send('true');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const Use = await firestore.collection('userr');
        const data = await Use.get();
        const UserArray = [];
        if(data.empty) {
            res.status(404).send('No User record found');
        }else {
            data.forEach(doc => {
                const user = new User(

                    doc.data()
                );
                UserArray.push(user);
            });
            res.send(UserArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const User = await firestore.collection('userr').doc(id);
        const data = await User.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const User =  await firestore.collection('userr').doc(id);
        await User.update(data);
        res.send('True');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('userr').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}