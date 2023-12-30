import { PrismaClient }from "@prisma/client"

export let prisma = new PrismaClient()
async function main() {
    try {
      await prisma.$connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Error:', error);
    }
}
main();