### Alterando Esquema

Após modificar o esquema deve-se sempre gerar uma nova migração, vamos neste exemplo adicionar o campo `gender` no esquema, a ser definido por um `Enum`(espécie de tipo enumerável). 

Antes da definição do `User` vamos criar um tipo enumerável.

```typescript
enum Gender {
  MALE
  FEMALE
  NOT_SPECIFIED
}
```

Modifique a model `User` no arquivo `prisma/squema.prisma` 

```typescript
model User { 
  id    Int     @id @default(autoincrement()) 
  
  githubID String  @unique
  githubLogin String
  avatarUrl String
  
  name  String
  birthDate DateTime
  gender  Gender  @default(NOT_SPECIFIED)

  createdAt DateTime @default(now())

} 
```

Agora é gerar a migração:

```bash
npx prisma migrate dev --name adicionando_genero_no_user
```

Este comando gera a migração e deixa preparada para que se possa gerar o Prisma Client (define o typescript para ser utilizado no projeto)

```bash
npx prisma generate
```

Agora poderemos usar este tipo enumerável em outras partes do sistema, fazendo sua exportação no arquivo `lib/prisma.ts`

```typescript
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Gender } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { Gender };
export { prisma };
```

Criaremos agora um script para executar um comando de inserção de dados no banco em `src/02_script.ts`


```typescript
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
```
