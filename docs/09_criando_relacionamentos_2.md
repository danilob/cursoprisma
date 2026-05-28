### Relacionamento N:N

Para configurar um relacionamento N:N no prisma iremos configurar no esquema um apontamento entre as models, mas para isso utilizaremos uma model intermediária.

Arquivo: `schema.prisma`:

```typecript
enum MealType {
  BREAKFAST
  LUNCH
  DINNER
  SNACK
  OTHER
}

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
  meals Meal[]
  foods Food[]
} 

model Meal {
  id          Int         @id @default(autoincrement())
  description String
  eatTimeAt   DateTime    @default(now())
  type  MealType  @default(OTHER)

  //pk -> chave estrangeira
  userId Int
  user User @relation(fields: [userId], references: [id])

  foods       MealFood[]
}

model Food {
  id            Int         @id @default(autoincrement())
  name          String

  calories100g  Float
  protein100g   Float
  carbs100g     Float
  fat100g       Float

  //pk -> chave estrangeira
  userId Int?
  user User? @relation(fields: [userId], references: [id])

  meals         MealFood[]

  
}

model MealFood {
  id            Int       @id @default(autoincrement())

  mealId        Int
  foodId        Int

  grams         Float

  // Valores calculados para este alimento nesta refeição
  calories      Float
  protein       Float
  carbs         Float
  fat           Float

  meal          Meal @relation(fields: [mealId], references: [id])
  food          Food @relation(fields: [foodId], references: [id])

  @@unique([mealId, foodId])
}
```

Conteúdo de um exemplo completo pode ser visto em  [src/07_script.ts](../src/07_script.ts):

