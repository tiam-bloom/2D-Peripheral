// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/user/list",
    method: "get",
    response: ({ _ }) => {
      return {
        code: 200,
        msg: "查询成功",
        data: [
          {
            id: 1,
            username: "tiam",
            password: "123456",
            roleId: 2
          },
          {
            id: 2,
            username: "admin",
            password: "admin123",
            roleId: 1
          }
        ]
      };
    }
  }
] as MockMethod[];
