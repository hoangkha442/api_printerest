import axios from 'axios';
import { userLocalStorage } from './localService.js';
export const BASE_URL_IMAGE = 'http://localhost:8080/public/img/';

export const https = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'token': userLocalStorage.get('USER_LOCAL')
    }
})
