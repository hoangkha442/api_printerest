import { https } from "./config";

export const pictureServices = {
    getPictures: () => {
        return https.get(`/picture/pictures`);
    },
    getPictureDetail: (id) => { 
        return https.get(`/picture/detailPicture/${id}`)
    },
    getComment: (id) => {
        return https.get(`/picture/comment/${id}`)
    }
}