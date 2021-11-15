const firebase = require('../db');
const firestore = firebase.firestore();

const checkID = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const accountID = await firestore.collection('AccountID').doc(username);
        const account = await accountID.get();
        if(!account.data().username === username)
        {
            return res.status(200).send("Invalid Account ID");
        }
        else if(account.data().type === 1){
            const userID = await firestore.collection('userr').doc(username)
            const idWithpassword = await userID.get();
            if(!idWithpassword.data().username === username)
            {
                return  res.status(200).send("Invalid Account ID");
            }
            if(idWithpassword.data().password !== password)
            {
                return  res.send('Invalid Password');
            }
            res.send(idWithpassword.data());
        }    
    }
    catch(error)
    {
        res.status(200).send("Invalid Account ID");
    }
}


module.exports = checkID;