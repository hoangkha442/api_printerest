import express from 'express';
import { checkSavedPictureByPicID, deletePicture, getCreatedPictureByUser, getUser, getUserByID, postComment, savedPicture, updateAvatarU, updateUser, uploadPic } from '../controllers/userController.js';
import upload from '../configs/upload.js';
const userRoute = express.Router();

userRoute.get('/users', getUser);
userRoute.get('/userID', getUserByID);
userRoute.get('/saved', savedPicture)
userRoute.get('/created-picture', getCreatedPictureByUser)
userRoute.get('/check-saved-pic/:id', checkSavedPictureByPicID)
userRoute.post('/comment', postComment)
userRoute.delete('/delete-picture/:hinhID', deletePicture)
userRoute.put('/update-user', updateUser)
userRoute.post('/upload-picture', upload.single('picture') , uploadPic)
userRoute.post('/upload-avatar', upload.single('picture') , updateAvatarU)
export default userRoute
