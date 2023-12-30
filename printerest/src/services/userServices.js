import { https } from "./config";

export const userServices = {
    login: (data) => {
        return https.post(`/auth/login`, data);
    },
    postComment: (data) => {
        return https.post(`/user/comment/:hinhID`, data);
    },
    getUserByID: () => { 
        return https.get('/user/userID');
    },
    postPicture: (data) => {
        return https.post(`user/upload-picture`, data);
    },
    getCreated: () => { 
        return https.get('/user/created-picture')
    },
    getSaved: () => { 
        return https.get('/user/saved')    
    },
    putUser: (data) => { 
        return https.put('/user/update-user', data)
    },
    checkSavedPictureByPicID: (id) => { 
        return https.get(`/user/check-saved-pic/:${id}`) 
    }
}