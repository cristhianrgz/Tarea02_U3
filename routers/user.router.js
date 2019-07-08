const router = require('express').Router();

module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((User) => 
        require('../controllers/user.controller')(User));

    router.post('/', (req, res) =>
        userCtrl.insertUser(req, res));

    router.get('/', (req, res) =>
        userCtrl.findAll(req, res));

    router.get('/:id',(req, res)=>
        userCtrl.findID(req,res))

    router.delete('/:id', (req, res) =>
        userCtrl.deleteUser(req, res))
    
    router.put('/:id', (req, res) =>
        userCtrl.updateUser(req,res))
    
    //CSV
    router.post('/userinsert', (req, res) =>
        userCtrl.insertUserCSV(req, res));
    
    router.get('/login/:email/:password',(req,res)=>
        userCtrl.login(req,res));
    
    return router;
}