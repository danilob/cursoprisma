import { prisma, Gender } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.update({
    where: {
      githubID: "danilob"
    },
    data: {
      gender: Gender.MALE
    }
  });
  
  console.log("Usuário Atualizado", user);
  
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