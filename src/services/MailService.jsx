import axios from 'axios'
import authHeader from './auth-header';


const apiUrl = process.env.REACT_APP_API_URL;

const MAIL_BASE_REST_API_URL = `${apiUrl}/mail/api/mail`;
const MAIL_BASE_REST_API_URL_depart = `${apiUrl}/mail/api/mail/depart`;
//const MAIL_BASE_REST_API_URL_depart = 'http://localhost:8080/api/auth/login';
//const token = localStorage.getItem(accessToken)

class MailService {

    getAllMail() {
        return axios.get(MAIL_BASE_REST_API_URL, { headers: authHeader() });
    }
    getAllDepart() {
      return axios.get(MAIL_BASE_REST_API_URL_depart, { headers: authHeader() });
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
export default MailService();