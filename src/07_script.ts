import { prisma, MealType } from "../lib/prisma";

async function main() {

  /*
    =====================================================
    CADASTRO DOS ALIMENTOS
    =====================================================
  */

  const rice = await prisma.food.create({
    data: {
      name: "Arroz da Roça",

      calories100g: 130,
      protein100g: 2.5,
      carbs100g: 28,
      fat100g: 0.3,
      userId: 3
    }
  });

  const chicken = await prisma.food.create({
    data: {
      name: "Peito de Frango",

      calories100g: 165,
      protein100g: 31,
      carbs100g: 0,
      fat100g: 3.6,
    }
  });

  const beans = await prisma.food.create({
    data: {
      name: "Feijão",

      calories100g: 76,
      protein100g: 4.8,
      carbs100g: 13.6,
      fat100g: 0.5,
    }
  });

  console.log("Alimentos cadastrados");

  /*
    =====================================================
    CRIAÇÃO DA REFEIÇÃO
    =====================================================
  */

  const meal = await prisma.meal.create({
    data: {
      description: "Almoço de quarta-feira",
      type: MealType.LUNCH,

      userId: 3
    }
  });

  console.log("Refeição criada");

  /*
    =====================================================
    FUNÇÃO AUXILIAR
    =====================================================
  */

  async function addFoodToMeal(
    mealId: number,
    foodId: number,
    grams: number
  ) {

    const food = await prisma.food.findUnique({
      where: {
        id: foodId
      }
    });

    if (!food) {
      throw new Error("Alimento não encontrado");
    }

    /*
      Fator baseado em 100g
    */

    const factor = grams / 100;

    /*
      Cálculo nutricional
    */

    const calories = food.calories100g * factor;
    const protein = food.protein100g * factor;
    const carbs = food.carbs100g * factor;
    const fat = food.fat100g * factor;

    /*
      Criação da relação MealFood
    */

    return prisma.mealFood.create({
      data: {
        mealId,
        foodId,

        grams,

        calories,
        protein,
        carbs,
        fat
      }
    });
  }

  /*
    =====================================================
    ADICIONANDO ALIMENTOS À REFEIÇÃO
    =====================================================
  */

  await addFoodToMeal(meal.id, rice.id, 200);

  await addFoodToMeal(meal.id, chicken.id, 150);

  await addFoodToMeal(meal.id, beans.id, 100);

  console.log("Alimentos adicionados à refeição");

  /*
    =====================================================
    CONSULTA COMPLETA
    =====================================================
  */

  const fullMeal = await prisma.meal.findUnique({
    where: {
      id: meal.id
    },

    include: {
      foods: {
        include: {
          food: true
        }
      },

      user: true
    }
  });

  /*
    =====================================================
    TOTAIS DA REFEIÇÃO
    =====================================================
  */

  const totals = fullMeal?.foods.reduce(
    (acc, item) => {

      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;

      return acc;

    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  );

  /*
    =====================================================
    EXIBIÇÃO
    =====================================================
  */

  console.log("\n");
  console.log("========== REFEIÇÃO ==========");
  console.log("\n");

  console.log("Descrição:", fullMeal?.description);
  console.log("Tipo:", fullMeal?.type);
  console.log("Usuário:", fullMeal?.user.name);

  console.log("\n");
  console.log("========== ALIMENTOS ==========");
  console.log("\n");

  fullMeal?.foods.forEach((item) => {

    console.log("----------------------------");

    console.log("Alimento:", item.food.name);

    console.log("Quantidade:", item.grams, "g");

    console.log("Calorias:", item.calories.toFixed(2));

    console.log("Proteínas:", item.protein.toFixed(2));

    console.log("Carboidratos:", item.carbs.toFixed(2));

    console.log("Gorduras:", item.fat.toFixed(2));

    console.log("----------------------------");
  });

  console.log("\n");
  console.log("========== TOTAIS ==========");
  console.log("\n");

  console.log("Calorias:", totals?.calories.toFixed(2));
  console.log("Proteínas:", totals?.protein.toFixed(2));
  console.log("Carboidratos:", totals?.carbs.toFixed(2));
  console.log("Gorduras:", totals?.fat.toFixed(2));

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

