const { SlashCommandBuilder } = require("discord.js");
const { generateFrontend } = require("../js/script");

const data = {
  axolotl_bucket1: { chance: 1, imgSrc: "img/fish/axolotl_bucket.png" },
  clownfish_bucket1: { chance: 1, imgSrc: "img/fish/clownfish_bucket.png" },
  cod_bucket1: { chance: 1, imgSrc: "img/fish/cod_bucket.png" },
  pufferfish_bucket1: { chance: 1, imgSrc: "img/fish/pufferfish_bucket.png" },
  salmon_bucket1: { chance: 1, imgSrc: "img/fish/salmon_bucket.png" },
  tadpole_bucket1: { chance: 1, imgSrc: "img/fish/tadpole_bucket.png" },
  spawner_fragment1: { chance: 1, imgSrc: "img/fish/chain.png" },
  mask_fragment1: { chance: 1, imgSrc: "img/fish/light_gray_dye.png" },
  cod1: { chance: 8.625, imgSrc: "img/fish/raw_cod.png" },
  cod2: { chance: 2.875, imgSrc: "img/fish/cooked_cod.png" },
  salmon1: { chance: 8.625, imgSrc: "img/fish/raw_salmon.png" },
  salmon2: { chance: 2.875, imgSrc: "img/fish/cooked_salmon.png" },
  pufferfish1: { chance: 8.625, imgSrc: "img/fish/pufferfish.png" },
  pufferfish2: { chance: 2.875, imgSrc: "img/fish/pufferfish.png" },
  clownfish1: { chance: 8.625, imgSrc: "img/fish/tropical_fish.png" },
  clownfish2: { chance: 2.875, imgSrc: "img/fish/tropical_fish.png" },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Simulates a fishing trip!")
    .addIntegerOption((option) =>
      option
        .setName("catches")
        .setDescription("The number of catches you want to simulate.")
    ),

  async execute(interaction) {
    const catches = interaction.options.getInteger("catches") ?? 100;

    if (catches > 1000) {
      return await interaction.reply({
        content: "Catches must be less than 1001!",
        ephemeral: true,
      });
    }

    const buffer = await generateFrontend(data, catches);

    await interaction.reply({
      content: `Simulation for ${catches} catches:`,
      files: [{ attachment: buffer }],
    });
  },
};
