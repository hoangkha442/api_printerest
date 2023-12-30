import { createToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import { prisma } from "../models/connect.js"
import bcrypt from "bcrypt"
export const login = async (req, res) => { 
    try{
        let {email, matKhau} = req.body
        let checkUser = await prisma.nguoi_dung.findUnique({
            where: {
                email
            }
        })
        if(checkUser){
            if(bcrypt.compareSync(matKhau, checkUser.mat_khau)){
                let token = createToken(checkUser.nguoi_dung_id)
                responseData(res, 'Login success', token, 200)
                return
            }
            else{
                responseData(res, 'wrong password', '', 404)
                return
            }
        }
        else{
            responseData(res, 'wrong email', '', 404)
            return
        }
    }
    catch(err){
        console.log('err: ', err);
        
        responseData(res, 'Error...', '', 500)
    }
}

export const sigup = async (req, res) => { 
    try{
        let {email, matKhau, hoTen, tuoi} = req.body
        let checkEmail = await prisma.nguoi_dung.findUnique({
            where: {
                email
            } 
        })
        if(checkEmail){
            responseData(res, 'Email already exists','', 400)
            return;
        }
        let newData = {
            email,
            mat_khau: bcrypt.hashSync(matKhau, 10) ,
            ho_ten: hoTen,
            tuoi
        }
        await prisma.nguoi_dung.create({data:newData})
        responseData(res, 'Sigup success!', '', 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}