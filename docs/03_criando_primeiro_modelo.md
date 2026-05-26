### Criando Primeiro Modelo

No arquivo `schema.prisma` adicione no final do arquivo

```typescript
model User { 
  id    Int     @id @default(autoincrement()) 
  
  githubID String  @unique
  githubLogin String
  avatarUrl String
  
  name  String
  birthDate DateTime

  createdAt DateTime @default(now())
} 
```

Para versionalizar, criar a migração, utilizaremos o comando:

```bash
npx prisma migrate dev --name iniciando_primeiro_modelo
```

Este comando gera a migração e deixa preparada para que se possa gerar o Prisma Client (define o typescript para ser utilizado no projeto)

```bash
npx prisma generate
```

