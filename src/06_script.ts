import { prisma } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Danilo Borges da Silva",
      githubID: "danilob",
      githubLogin: "danilob",
      avatarUrl: "https://example.com/avatar.jpg",
      birthDate: new Date("1989-04-18"),
      weightLogs: {
        create: [
          {
            height: 1.69,
            weight: 90.0,
            createdAt: new Date("2026-04-01")
          },
          {
              height: 1.69,
              weight: 87.0,
              createdAt: new Date("2026-05-01")
          }
        ]
      },
    },
    include: {
      weightLogs: true
    }
  });
  
  console.log("Usuário Criado", user);
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });