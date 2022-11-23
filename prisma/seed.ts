import { PrismaClient, Restaurant } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  // const voucher1 = await prisma.voucher.create({
  //   data: {
  //     name: "promotion",
  //     value: 50,
  //     details: "This is a testing voucher",
  //   },
  // });

  // specify the the amount of restaurant and its item
  const totalRestaurant = 5;
  const itemPerRestaurant = 7;
  const restaurants = [];

  for (let i = 0; i < totalRestaurant; i++) {
    restaurants.push(
      prisma.restaurant.create({
        data: {
          title: faker.company.name(),
          details: faker.company.catchPhrase(),
          type: faker.company.catchPhraseAdjective(),
        },
        select: { id: true },
      })
    );
  }

  const res = await (await Promise.all(restaurants)).map((e) => e.id);

  for (let i = 0; i < res.length; i++) {
    const items = [];
    for (let j = 0; j < itemPerRestaurant; j++) {
      items.push(
        prisma.item.create({
          data: {
            name: faker.commerce.productName(),
            category: faker.commerce.productAdjective(),
            price: Number(faker.commerce.price()),
            details: faker.commerce.productDescription(),
            restaurantId: res[i],
          },
        })
      );
    }

    Promise.all(items);
  }
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
