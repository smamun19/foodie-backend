import { PostgresDatabaseAdapter } from "@deepkit/postgres";
import { entity, PrimaryKey, AutoIncrement, Unique } from "@deepkit/type";
import { Database } from "@deepkit/orm";

@entity.name("user")
export class User {
  id: number & PrimaryKey & Unique & AutoIncrement = 0;
  created: Date = new Date();

  constructor(public name: string) {}
}

export const deepkit = new Database(
  new PostgresDatabaseAdapter({
    // user: "postgres",
    // database: "foodie",
    // host: "localhost",
    // port: 5432,
    connectionString: "postgresql://postgres@localhost:5432/foodie",
  }),
  [User]
);
// await deepkit.migrate(); //create tables

export default deepkit;
