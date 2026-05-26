### Inicializar Prisma ORM


Lista todas os comandos do prisma:

```bash
npx prisma
```

```bash
npx prisma init --datasource-provider sqlite --output ../generated/prisma
```

### Defina o arquivo SQLITE

No `.env`defina o caminho para o banco de dados sqlite

```bash
DATABASE_URL="file:./dev.db"
```
