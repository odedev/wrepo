import path from 'node:path';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

// 执行命令的目录
const __rootDirname = path.resolve();

const entities = path.join(__rootDirname, "src", "**", "**", "entity.js");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "tool.db",
  synchronize: true,
  logging: true,
  entities: [entities],
  migrations: [],
  subscribers: [],
})

export default AppDataSource;
