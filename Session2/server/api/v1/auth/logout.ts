// server/api/login.post.js
import { logout } from "~/apis/auth"

export default defineEventHandler(async (event) => {
  try {
    const cookies = getCookie(event, 'token');    
    const result = await logout(cookies) 
    return result
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    }
  }
})