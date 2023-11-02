import { http } from "@/utils/http";
import { LoginToken, Result, Token } from "@/utils/http/types";

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<Result<LoginToken>>("post", "/login", { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<Result<Token>>("post", "/refreshToken", { data });
};
