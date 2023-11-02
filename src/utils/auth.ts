import Cookies from "js-cookie";
import { storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";
import { LoginToken } from "@/utils/http/types";

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

/** 获取`token` */
export function getToken(): LoginToken {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageSession().getItem(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: LoginToken) {
  let expire = 0;
  const { accessToken, refreshToken } = data;
  expire = data.expire; // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expire });

  expire > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expire - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  function setSessionKey(username: string, role: string) {
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_ROLE(role);
    storageSession().setItem(sessionKey, {
      refreshToken,
      expire,
      username,
      role
    });
  }

  if (data.username && data.role) {
    const { username, role } = data;
    setSessionKey(username, role);
  } else {
    const username =
      storageSession().getItem<LoginToken>(sessionKey)?.username ?? "";
    const role = storageSession().getItem<LoginToken>(sessionKey)?.role ?? "";
    setSessionKey(username, role);
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
