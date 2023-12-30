import { decodeToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import { prisma } from "../models/connect.js"
import bcrypt from 'bcrypt'
export const getUser = async (req, res) => { 
    try{
        let data = await prisma.nguoi_dung.findMany()
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        responseData(res, 'Error...', '', 500)
    }
}

export const savedPicture = async (req, res) => { 
    try{
        let { token } = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let data = await prisma.luu_anh.findMany({
            where: {
                nguoi_dung_id
            },
            include: {
                hinh_anh: true,
            }
        })
        responseData(res, 'Success',data, 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}

export const getCreatedPictureByUser = async (req, res) => { 
    try{
        let { token } = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let data = await prisma.hinh_anh.findMany({
            where: {
                nguoi_dung_id
            }
        })
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        responseData(res, 'Error', '', 500)
    }
}

export const checkSavedPictureByPicID = async (req, res) => { 
    try{
        let { id } = req.params
        let {token} = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let checkSaved = await prisma.luu_anh.findMany({
            where: {
                hinh_id: id * 1,
                nguoi_dung_id
            }
        })
        if(checkSaved.length >= 1){
            responseData(res, 'Success', 'Đã lưu', 200)
            return
        }
        responseData(res, 'Success', 'Lưu', 200)
    }
    catch(err){
        responseData(res, err, '', 500)
    }
}

export const postComment = async (req, res) => { 
    try{
        let { token } = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let { noiDung, hinhID } = req.body
        let newData = {
            nguoi_dung_id,
            hinh_id: hinhID * 1,
            ngay_binh_luan: new Date(),
            noi_dung: noiDung
        }
        await prisma.binh_luan.create({data: newData})
        responseData(res, 'Post comment success!','', 200)
    }
    catch(err){
        responseData(res, 'Error...','', 500)
    }
}

export const deletePicture = async (req, res) => { 
    try{
        let { token } = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let { hinhID } = req.params
        let checkPicture = await prisma.hinh_anh.findUnique({
            where: {
                nguoi_dung_id,
                hinh_id: hinhID *1
            }
        })
        if(checkPicture != null){
           await prisma.hinh_anh.delete({
               where: {
                   nguoi_dung_id,
                   hinh_id: hinhID *1
               }
           })
           responseData(res, 'Delete success', '', 200)
           return
        }
        responseData(res, "You don't have photos to delete", '', 404)    }
    catch(err){
        responseData(res, 'Error...', '', 500)
    }
}

export const updateUser = async (req, res) => { 
    try{
        let {token} = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data

        let {email, mat_khau, ho_ten, tuoi} = req.body
        let getUser = await prisma.nguoi_dung.findUnique({
            where: {
                nguoi_dung_id
            }
        })
        getUser.mat_khau = bcrypt.hashSync(mat_khau, 10)
        getUser.email = email
        getUser.ho_ten = ho_ten
        getUser.tuoi = tuoi * 1
        await prisma.nguoi_dung.update({
            where:{
                nguoi_dung_id
            },
            data: getUser
        })
        responseData(res, 'Successed update info!', '', 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}

export const updateAvatarU = async (req, res) => { 
    try{
        let {file} = req
        let {token} = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        if(nguoi_dung_id){
            let anh_dai_dien = file.filename
            let data = await prisma.nguoi_dung.findUnique({
                where: {
                    nguoi_dung_id
                }
            })
            data.anh_dai_dien = anh_dai_dien
            if(data){
                await prisma.nguoi_dung.update({
                    where: {
                        nguoi_dung_id
                    },
                    data: data
                })
                responseData(res, 'upload success!', '', 200)
            }
        }
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'err...', '', 500)
    }
}

export const getUserByID = async (req, res) => { 
    try{
        let {token} = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        let data = await prisma.nguoi_dung.findMany({
            where: {
                nguoi_dung_id
            }
        })
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        responseData(res, 'Error...', err, 500)
    }
}

export const uploadPic = async (req, res) => { 
    try{
        let {file} = req
        let {tenHinh, moTa} = req.body
        let {token} = req.headers
        let dToken = decodeToken(token)
        let nguoi_dung_id = dToken.data
        if(nguoi_dung_id){
            let data = {
                ten_hinh: tenHinh,
                duong_dan: file.filename,
                mo_ta: moTa,
                nguoi_dung_id
            }
            await prisma.hinh_anh.create({data})
            responseData(res, 'upload success!', '', 200)
        }
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}