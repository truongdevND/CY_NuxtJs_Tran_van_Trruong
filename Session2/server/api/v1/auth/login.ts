// server/api/login.post.js
import { login } from "~/apis/auth";

export default defineEventHandler(async (event) => {
  const existingToken = getCookie(event, 'token');

  if (existingToken) {
    return {
      statusCode: 200,
      message: 'Bạn đã đăng nhập rồi.',
      token: existingToken, 
    };
  }

  const { email, password } = await readBody(event);
  
  const response = await login(email, password);

  if (!response) {
    return {
      statusCode: response?.status || 500,
      message: 'Đăng nhập thất bại từ API bên thứ ba',
    };
  }

  const token = response.token;
  
  setCookie(event, 'token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,  
    httpOnly: true,  
  });

  return {
    statusCode: 200,
    message: 'Đăng nhập thành công',
    response,
  };
});
