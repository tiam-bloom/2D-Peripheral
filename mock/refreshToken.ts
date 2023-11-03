import { MockMethod } from "vite-plugin-mock";

// 模拟刷新token接口
export default [
  {
    url: "/api/refreshToken",
    method: "post",
    response: ({ body }) => {
      if (body.refreshToken) {
        return {
          code: 200,
          msg: "刷新成功",
          data: {
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRpYW0iLCJyb2xlIjoiY29tbW9uIiwianRpIjoiNzk5YzhmZjQtMGM4NS00NjNiLWFhYTUtYTkxMzdjMDY2MDUzIiwiZXhwIjoxNjk5MDEzODQ4LCJpYXQiOjE2OTg5ODg2NDgsInN1YiI6IlBlcmlwaGVyYWxzIiwiaXNzIjoiVGlhbSJ9.C--TQIcyCf_LwsuZRY5Zgc3xi5ZNAkQ4yYSrMSctQBE",
            refreshToken: "f4eb1dfd-9718-43d4-b721-20122578c7f2",
            expire: 1699013848275
          }
        };
      }
    }
  }
] as MockMethod[];
