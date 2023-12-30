import { responseData } from "../configs/response.js"
import { prisma } from "../models/connect.js"

export const getPicture = async (req, res) => { 
    try{
        let data = await prisma.hinh_anh.findMany()
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        responseData(res, 'Error...', '', 500)
    }
}

export const getPictureByName = async (req, res) => { 
    try{
        let { keySearch } = req.params
        let data = await prisma.hinh_anh.findMany({
            where:{
                ten_hinh: {
                    contains: keySearch
                }
            }
        })
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}

export const getPictureAndUser = async (req, res) => { 
    try{
        let { id } = req.params
        let data = await prisma.hinh_anh.findUnique({
            where:{
                hinh_id: id * 1
            },
            include: {
                nguoi_dung: true
            }
        })
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}

export const getCommentById = async (req, res) => { 
    try{
        let { id } = req.params
        let data = await prisma.binh_luan.findMany({
            where:{
                hinh_id: id * 1
            },
            include: {
                nguoi_dung: true,
            }
        })
        responseData(res, 'Success', data, 200)
    }
    catch(err){
        console.log('err: ', err);
        responseData(res, 'Error...', '', 500)
    }
}