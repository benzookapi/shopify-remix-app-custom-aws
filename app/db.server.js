//import { PrismaClient } from "@prisma/client";
//import { PrismaClient } from "@architect/shared/client/index.js";
import { PrismaClient } from "./prisma/generated/client"

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

export default prisma;
