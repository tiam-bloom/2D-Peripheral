export interface User {
  id: number;
  username: string;
  password: string;
  roleId: number;
}

export interface Role {
  id: number;
  roleName: string;
  roleLabel: string;
}
