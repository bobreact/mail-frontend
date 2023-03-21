import axios from 'axios'
import authHeader from './auth-header';
const MAIL_BASE_REST_API_URL = 'http://localhost:8080/mail/api/mail';
//const MAIL_BASE_REST_API_URL2 = 'http://localhost:8080/api/auth/login';
//const token = localStorage.getItem(accessToken)

class MailService {

    getAllMail() {
        return axios.get(MAIL_BASE_REST_API_URL, { headers: authHeader() });
    }
    //logout(){
      //  return axios.post(MAIL_BASE_REST_API_URL2)
    //}
    
    //async login(login) {

        //const Response = await fetch(MAIL_BASE_REST_API_URL2, {
            //method: "POST",
            //headers: {
              //  "Content-Type": "application/json"
            //},
          //  body: JSON.stringify(login)
        //});
        //return await Response.json();
        
   // }




}
export default new MailService();