import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { getLogin, refreshTokenApi } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { setToken, removeToken, sessionKey } from "@/utils/auth";
import { LoginToken, Result, Token } from "@/utils/http/types";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username: storageSession().getItem<LoginToken>(sessionKey)?.username ?? "",
    // 页面级别权限
    role: storageSession().getItem<LoginToken>(sessionKey)?.role ?? ""
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLE(role: string) {
      this.role = role;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<Result<LoginToken>>((resolve, reject) => {
        getLogin(data)
          .then(res => {
            if (res) {
              setToken(res.data);
              resolve(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<Result<Token>>((resolve, reject) => {
        refreshTokenApi(data)
          .then(res => {
            if (res) {
              setToken(res.data);
              resolve(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
