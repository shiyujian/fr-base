



import { searchToObj } from '../script/others.js';
import { setCookie } from '../script/frCookie.js';


const setCookieUByLocation = function () {
    const { token } = searchToObj(window.location.search);
    if(token) {
        setCookie('u', token, 100);
    }
};

export default setCookieUByLocation