// server/api/login.post.js
import { register } from "~/apis/auth"

export default defineEventHandler(async (event) => {
    const { email, password, name } = await readBody(event);

    const response = await register(email, password, name);

    if (!response) {
        return {
            statusCode: response?.status || 500,
            message: 'Đăng nhập thất bại từ API bên thứ ba',
        };
    }
    return {
        statusCode: 200,
        message: 'Đăng kí thành công',
        response,
    };
});
