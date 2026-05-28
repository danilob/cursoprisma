### Relacionamento 1:N

Para configurar um relacionamento 1:N no prisma iremos configurar no esquema um apontamento entre as models.

Arquivo: `schema.prisma`:

```typecript
model User { 
  id    Int     @id @default(autoincrement()) 
  
  githubID String  @unique
  githubLogin String
  avatarUrl String
  
  name  String
  birthDate DateTime
  gender  Gender  @default(NOT_SPECIFIED)

  createdAt DateTime @default(now())

  weightLogs WeightLog[]
} 

model WeightLog {
  id    Int     @id @default(autoincrement()) 
  height Float
  weight Float

  //pk -> chave estrangeira
  userId Int

  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

Em seguida faça a migração (`npx prisma migrate dev --name criando_model_weight_log`) e o generate (`npx prisma generate`).
Com isso é possível na criação já inserir dados da relação usando o `include`.

Arquivo: `src/06_script.ts`:

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
```

Caso queira na consulta trazer dados da relação utilize `include`:

```typescript
const users = await prisma.user.findMany({
  include: {
    weightLogs: true
  }
})
```