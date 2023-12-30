import express from 'express';
import { getCommentById, getPicture, getPictureAndUser, getPictureByName } from '../controllers/pictureController.js';
const pictureRoute = express.Router();

pictureRoute.get('/pictures', getPicture);
pictureRoute.get('/search/:keySearch', getPictureByName)
pictureRoute.get('/detailPicture/:id',getPictureAndUser)
pictureRoute.get('/comment/:id', getCommentById)
export default pictureRoute
