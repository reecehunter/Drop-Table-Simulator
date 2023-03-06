// Define the droptable
const data = {
  axolotl_bucket1: 1,
  clownfish_bucket1: 1,
  cod_bucket1: 1,
  pufferfish_bucket1: 1,
  salmon_bucket1: 1,
  tadpole_bucket1: 1,
  spawner_fragment1: 1,
  mask_fragment1: 1,
  cod1: 8.625,
  cod2: 2.875,
  salmon1: 8.625,
  salmon2: 2.875,
  pufferfish1: 8.625,
  pufferfish2: 2.875,
  clownfish1: 8.625,
  clownfish2: 2.875,
};

const simulateDrops = (input, amount) => {
  // Define the variable to be returned
  const result = {};

  // Define the variable to put the chances into an array to be reduced later
  const chanceTable = {};

  // Copy the keys from our input variable
  for (const key in input) {
    result[key] = 0;
    if (!chanceTable[input[key]]) {
      chanceTable[input[key]] = 1;
    } else chanceTable[input[key]]++;
  }

  // Loop through "amount" times
  for (let i = 0; i < amount; i++) {
    // Set the first rarity to check to the max rarity
    let rarity = Math.max(...Object.values(input));

    // Define a random number as our "dice roll" out of the max rarity chance
    const rand = Math.random() * rarity;

    // Calculate find the closest rarity in the list of rarity chances
    for (const i in Object.values(input)) {
      // Define the index we will compare to rand
      const index = Object.values(input)[i];
      // Check if index * amount of times it shows up in chance table is greater than rarity
      if (rand >= index) rarity = index;
    }

    // Get the drop table based on the calculated rarity
    const droptable = [];
    for (const key in input) {
      if (rarity === input[key]) droptable.push(key);
    }

    // Define a random number out of the number of drops in the calculated drop table
    const rand2 = Math.round(Math.random() * (droptable.length - 1));
    // Add the final chosen item to the result
    result[droptable[rand2]]++;
  }

  // Retun the result
  return result;
};

// Log the simulated drops result
console.log(simulateDrops(data, 100));
