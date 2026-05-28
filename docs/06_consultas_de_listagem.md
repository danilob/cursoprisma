### Consultas no Banco de Dados

Podemos fazer todo tipo de consulta usando o prisma. Para retornar uma lista de usuários cadastrados podemos fazer uso do `findMany()`.

```typecript
const users = await prisma.user.findMany();
```

Usando o `findMany()` é possível especificar quais campos retornar usando a cláusula `select`, ou condições usando `where` ou campos para serem omitidos usando a cláusula `omit`.

```typescript
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
```

