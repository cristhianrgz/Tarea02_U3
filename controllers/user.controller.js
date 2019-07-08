const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');
const csv = require('csvtojson');
let _user;

//Insertar Usuario
const insertUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data)=> {
            res.status(200);
            res.json({msg:"* Usuario creado de forma exitosa *", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"* Error!, no se ha podido crear el usuario *", err:err});
        })
}

//consulta general
const findAll = (req, res) => {
    _user.find()
        .then ((data) =>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se ha podido realizar la consulta"});
            }
            else{
                res.status(status.OK);
                res.json({msg:"* Exito!, consulta exitosa *", data:data});
            }
        })
        .catch((err) =>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"* Error, no se encontro el registro *"})
        });
}

//consulta por id
const findID = (req, res) => {
    const {id}=req.params;
    const params = {
        _id:id
    };
    _user.findOne(params)
        .then((data) =>{
            res.status(status.OK);
            res.json({msg:"* Exito!, consulta exitosa *",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"* Error!!! No se encontro el registro *",err:err})
        });
}

//eliminar
const deleteUser = (req,res) =>{
    const {id} = req.params;

    const params={
        _id:id
    };
    _user.findByIdAndRemove(params)
        .then((data) =>{
                res.status(status.OK);
                res.json({msg:"*Se ha eliminado de forma exitosa *",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"* Error!!! No se encontro el registro *",err:err})
        });
}

//Actualizar
const updateUser = (req,res) =>{
    const {id} = req.params;
    const user = req.body;

    const params = {
        _id:id
    }
    
    _user.findByIdAndUpdate(params,user)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"* Usuario actualizado *",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"* No se ha podido actualizar *",err:err});
        })
}

//Formato CSV insert
const rutaArcsv='C:\\Users\\Adrian Rdz\\Desktop\\Empresariales\\U3\\Ejer02U3\\controllers\\usersInsert.csv'
const insertUserCSV= async (req, res) => { csv().fromFile(rutaArcsv).then((jsonObj) => {
    res.status(status.NOT_FOUND);
    _user.create(jsonObj).then((jsonObj) => {
        res.status(status.OK);
        res.json({msg:"* Usuarios insertados de forma exitosa *", jsonObj: jsonObj});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"* Error!!, no se pudo insertar usuarios *", data:err});
    })
})
.catch((err) => {
        res.status(status.NOT_FOUND);
})
    const jsonArray= await csv().fromFile(rutaArcsv);
}

//Login
const login = (req , res) => {
    const {email,password} = req.params;
    let query = {email: email, password:password};
    _user.findOne(query,"-password")
    .then((user) => {
        if(user){
            const token = jwt.sign({email:email}, _config.SECRETJWT);
            res.status(status.OK);
            res.json({
                msg:"* Acceso Exitoso *",
                data:{
                    user:user,
                    token:token
                }
                
            });
        }else{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!, el usuario o la contraseña son incorrectos"});
        }
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!, el usuario o la contraseña son incorrectos",err: err});
    })
};

module.exports = (User) => {
    _user = User;
    return({
        insertUser,
        insertUserCSV,
        findAll,
        deleteUser,
        updateUser,
        findID,
        login
    });
}