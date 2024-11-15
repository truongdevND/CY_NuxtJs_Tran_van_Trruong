import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const exceptionPage = ["/login", "/register","/"];
  const cookieToken = useCookie("token");

 
    if (!cookieToken.value && !exceptionPage.includes(to.path)) {
      return navigateTo("/login");
    }
    
    if (cookieToken.value && exceptionPage.includes(to.path)) {
      return navigateTo("/products");
    }
  
});
