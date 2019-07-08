const http = require('http');
const path = require('path');
const status = require('http-status');

let _brand;

const createBrand = (req, res) => {
    const brand = req.body;

    _brand.create(brand)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Usuario creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", err:err});
        })
}

const findAllB = (req, res) => {
    _brand.find()
        .then ((data) =>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro usuario"});
            }
            else{
                res.status(status.OK);
                res.json({msg:"Exito!!!", data:data});
            }
        })
        .catch((err) =>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"})
        });
}

const findUneB = (req, res) => {
    const {id}=req.params;
    const params = {
        _id:id
    };
    _brand.findOne(params)
        .then((data) =>{
            res.status(status.OK);
            res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}

const deleteByIDB = (req,res) =>{
    const {id} = req.params;

    const params={
        _id:id
    };
    _brand.findByIdAndRemove(params)
        .then((data) =>{
                res.status(status.OK);
                res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}

const updateByIdB = (req,res) =>{
    const {id} = req.params;
    const brand = req.body;

    const params = {
        _id:id
    }
    
    _brand.findByIdAndUpdate(params,brand)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Update correcto",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error, documento no actualizado",err:err});
        })
}

module.exports = (Brand) => {
    _brand = Brand;
    return({
        createBrand,
        findAllB,
        findUneB,
        deleteByIDB,
        updateByIdB
    });
}