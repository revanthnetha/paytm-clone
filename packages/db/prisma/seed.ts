import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'revanth@gmail.com' },
    update: {},
    create: {
      email: 'revanth@gmail.com',
      password: '',
      name: 'revanth',
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bandi@gmail.com' },
    update: {},
    create: {
      email: 'bandi@gmail.com',
      password: '',
      name: 'bandi',
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })