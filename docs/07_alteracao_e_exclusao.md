### Como alterar e deletar registros

Para alterar um registro no banco de dados utilizaremos o `update`. Cuidado quanto a cláusula `where`, podem ocorrer a atualização de vários registros de uma só vez.

Arquivo: `src/04_script.ts`:

```typecript
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
```

E para excluir basta utilizar a cláusula `delete` especificando a condição de exclusão.


```typescript
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
```