import { prisma, Gender } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const users = await prisma.user.findMany({
    select: {
      name: true,
      gender: true,
      githubID: true,
    },
    where: {
      gender: Gender.NOT_SPECIFIED
    }
  });
  
  console.log("Usuários Encontrados", users);
  
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