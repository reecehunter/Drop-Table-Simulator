const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Define the drop table
// const data = {
//   axolotl_bucket1: { chance: 1, imgSrc: "img/fish/axolotl_bucket.webp" },
//   clownfish_bucket1: { chance: 1, imgSrc: "img/fish/clownfish_bucket.webp" },
//   cod_bucket1: { chance: 1, imgSrc: "img/fish/cod_bucket.webp" },
//   pufferfish_bucket1: { chance: 1, imgSrc: "img/fish/pufferfish_bucket.webp" },
//   salmon_bucket1: { chance: 1, imgSrc: "img/fish/salmon_bucket.webp" },
//   tadpole_bucket1: { chance: 1, imgSrc: "img/fish/tadpole_bucket.webp" },
//   spawner_fragment1: { chance: 1, imgSrc: "img/fish/chain.webp" },
//   mask_fragment1: { chance: 1, imgSrc: "img/fish/light_gray_dye.webp" },
//   cod1: { chance: 8.625, imgSrc: "img/fish/raw_cod.webp" },
//   cod2: { chance: 2.875, imgSrc: "img/fish/cooked_cod.webp" },
//   salmon1: { chance: 8.625, imgSrc: "img/fish/raw_salmon.webp" },
//   salmon2: { chance: 2.875, imgSrc: "img/fish/cooked_salmon.webp" },
//   pufferfish1: { chance: 8.625, imgSrc: "img/fish/pufferfish.webp" },
//   pufferfish2: { chance: 2.875, imgSrc: "img/fish/pufferfish.webp" },
//   clownfish1: { chance: 8.625, imgSrc: "img/fish/tropical_fish.webp" },
//   clownfish2: { chance: 2.875, imgSrc: "img/fish/tropical_fish.webp" },
// };

function simulateDrops(data, amount) {
  // Define a variable to store the drop results
  const result = {};

  // Define a variable to store the drops to randomly choose from
  const pool = [];

  // Loop through "amount" times
  for (let i = 0; i < amount; i++) {
    // Put all the drops into an array
    for (const key in data) {
      for (let i = 0; i < Math.ceil(data[key].chance); i++) {
        pool.push({ name: key, imgSrc: data[key].imgSrc, amount: 0 });
      }
    }

    // Define a random number which will decide the drop that gets selected
    const rand = Math.floor(Math.random() * pool.length);

    // Add the selected drop based to the result
    const chosenDrop = pool[rand];
    if (result[chosenDrop.name]) result[chosenDrop.name].amount++;
    else result[chosenDrop.name] = chosenDrop;
  }

  // Return the selected drop based on rand
  console.log(result);
  return result;
}

const generateFrontend = async (data, amount) => {
  const simulatedDrops = simulateDrops(data, amount);

  const canvas = createCanvas(500, 250);
  const ctx = canvas.getContext("2d");

  await loadImage("img/inventory.png").then(async (backgroundImage) => {
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    let countX = 0;
    let countY = 0;

    for (const key in simulatedDrops) {
      if (simulatedDrops[key].amount === 0) continue;

      await loadImage(simulatedDrops[key].imgSrc).then((img) => {
        const space = 36;

        ctx.drawImage(img, 5 + countX * space, 5 + countY, 32, 32);

        ctx.font = "bold 18px Arial";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.textAlign = "right";
        ctx.strokeText(
          simulatedDrops[key].amount,
          38 + countX * space,
          38 + countY
        );

        ctx.fillStyle = "yellow";
        ctx.fillText(
          simulatedDrops[key].amount,
          38 + countX * space,
          38 + countY
        );

        countX++;

        if (countX >= 9) {
          countX = 0;
          countY += space;
        }
      });
    }
  });

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);

  return buffer;
};

module.exports = { generateFrontend };
