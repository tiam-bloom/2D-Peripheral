// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          code: 200,
          msg: "登录成功",
          data: {
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwianRpIjoiMDdhNDgzMzEtMjQwZC00OTliLWIxNDUtY2MwMWZlZjc2ZWNkIiwiZXhwIjoxNjk4OTQyMTg4LCJpYXQiOjE2OTg5MTY5ODgsInN1YiI6IlBlcmlwaGVyYWxzIiwiaXNzIjoiVGlhbSJ9.spK_BOm0LpJ_pDeMftZYFdFLm0GdR9AGeYo-587L5E8",
            refreshToken: "6c821244-b528-4258-a731-1ba3dfb1b51e",
            expire: 1698942188956,
            username: "admin",
            role: "admin"
          }
        };
      }
    }
  }
] as MockMethod[];
