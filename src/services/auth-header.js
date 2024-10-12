export default function authHeader() {
  
  const token = localStorage.getItem('token')

 
    return { Authorization: `Bearer ${token}` };
    // return { "x-auth-token": user.accessToken };
  
}
