const express = require('express');
const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser} = require('../controllers/userController');


const checkID = require('../controllers/checkidController')
const router = express.Router();

router.post('/checkid/login', checkID);


router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);



module.exports = {
    routes: router
}