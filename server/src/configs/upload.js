// API upload avatar
import multer from 'multer';
let storage = multer.diskStorage({
    destination: process.cwd() + '/public/img', // nơi định nghĩa đường dẫn lưu hình
    filename: (req, file, callback) => { 
        let newName = new Date().getTime() + '_' + file.originalname;
        callback(null, newName)
     }// Đổi tên hình 
});
let upload = multer({ storage: storage})

export default upload