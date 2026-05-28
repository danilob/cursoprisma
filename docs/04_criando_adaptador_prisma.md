### Criando Prisma Client

Para utilizar o prisma dentro do sistema será necessário criar um `PrismaClient`, para isso será necessário criar um adapter para o `PrismaClient`, defina o seguinte arquivo em `lib/prisma.ts`

```typescript
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
```

Criaremos agora um script para executar um comando de inserção de dados no banco em `src/01_script.ts`


```typescript
import { prisma } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Danilo Borges da Silva",
      githubID: "danilob",
      githubLogin: "danilob",
      avatarUrl: "https://example.com/avatar.jpg",
      birthDate: new Date("1989-04-18")
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

```

Este comando gera a migração e deixa preparada para que se possa gerar o Prisma Client (define o typescript para ser utilizado no projeto)

```bash
npx prisma generate
```

Para usarmos o code runner, crie um arquivo dentro da pasta `.vscode` chamado `settings.json` e coloque o seguinte código:

```json
{
    "git.ignoreLimitWarning": true,
    "code-runner.executorMap": {
        "typescript": "npx tsx",
    }
}
```

Basta agora usar o code runner para executar o `01_script.ts`.



