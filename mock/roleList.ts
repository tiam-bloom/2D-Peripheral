// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/role/list",
    method: "get",
    response: ({ _ }) => {
      return {
        code: 200,
        msg: "查询成功",
        data: [
          {
            id: 1,
            roleName: "admin",
            roleLabel: "管理员"
          },
          {
            id: 2,
            roleName: "common",
            roleLabel: "普通用户"
          }
        ]
      };
    }
  }
] as MockMethod[];
