import { prisma, Gender } from "../lib/prisma";


async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Maria da Silva",
      githubID: "mariasilva",
      githubLogin: "mariasilva",
      avatarUrl: "https://example.com/avatar.jpg",
      birthDate: new Date("1989-04-18"),
      gender: Gender.FEMALE
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