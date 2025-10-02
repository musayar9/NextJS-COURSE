import "dotenv/config";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    users: {
      count: 100,
      columns: {
        name: f.fullName(),
        email: f.email(),
      },
    },
    posts: {
      count: 20,
      columns: {
        title: f.loremIpsum({ sentencesCount: 1 }),
        content: f.loremIpsum({
          sentencesCount: 5,
        }),
      },
    },
    postLikes: {
      count: 20,
    },
    comments: {
      count: 100,
      columns: {
        content: f.loremIpsum({
          sentencesCount: 3,
        }),
      },
    },
  }));
}

main();
