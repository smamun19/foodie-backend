import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  const voucher1 = await prisma.voucher.create({
    data: {
      name: "promotion",
      value: 50,
      details: "This is a testing voocher",
    },
  });

  const restaurant1 = await prisma.restaurant.create({
    data: {
      title: faker.company.name(),
      location: {
        create: {
          lat: Number(faker.address.latitude()),
          long: Number(faker.address.latitude()),
          name: faker.address.cityName(),
          details: faker.address.streetAddress(),
        },
      },
      details: faker.company.catchPhraseDescriptor(),
      item: {
        createMany: {
          data: {
            name: faker.commerce.productName(),
            category: faker.commerce.productAdjective(),
            price: Number(faker.commerce.price()),
            details: faker.commerce.productDescription(),
          },
        },
      },
    },
  });
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
