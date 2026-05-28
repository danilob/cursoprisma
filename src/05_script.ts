import { prisma, Gender } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.delete({
    where: {
      id: 1
    }
  })
  
  console.log("Usuário deletado", user);
  
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