import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const exceptionPage = ["/login", "/register"];
  const cookieToken = useCookie("token");

  if (process.client && !cookieToken.value) {
    if (!exceptionPage.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
