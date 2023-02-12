/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries for a fresh seed
  await knex("merchants").del()

  //Seeding database
  for (let i = 0; i < 10; i++) {
    await knex("merchants").insert([
      {
        merchant_name: "Merchant" + i,
        phone_number: "012" + String(Math.floor(Math.random() * 1000000)),
        latitude: Math.random() * 90,
        longitude: Math.random() * 90,
      },
    ])
  }
}
