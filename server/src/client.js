const P = require("@prisma/client")

const prisma =new P.PrismaClient()

module.exports = { prisma };
