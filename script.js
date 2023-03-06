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
};

const simulateDrops = (input, amount, total = 100) => {
  // Define the variable to be returned
  const result = {};

  // Define the variable to put the chances into an array to be reduced later
  const chancesArray = [];

  // Copy the keys from our input variable
  for (const key in input) {
    result[key] = 0;
    chancesArray.push(input[key]);
  }

  // Loop through "amount" times
  for (let i = 0; i < amount; i++) {
    // Define a random number as our "dice roll" out of the total paramater (100 default)
    const rand = Math.random() * total;

    // Calculate find the closest rarity in the list of rarity chances
    // const rarity = Object.values(input).reduce((prev, curr) => {
    //   console.log(prev, curr);
    //   return Math.abs(curr - rand) < Math.abs(prev - rand) ? curr : prev;
    // });
    let rarity = Object.values(input)[0];
    for (const key in Object.values(input)) {
      const value = Object.values(input)[key];
      // console.log(value, rand / Object.values(input).length);
      if (value < rand / Object.values(input).length) rarity = value;
    }

    // Get the drop table based on the rarity
    const droptable = [];
    for (const key in input) {
      if (rarity === input[key]) droptable.push(key);
    }

    // Define a random number out of the number of drops in the calculated drop table
    const rand2 = Math.round(Math.random() * droptable.length);
    // Add the final chosen item to the result
    result[droptable[rand2]]++;
  }

  // Retun the result
  return result;
};

// Log the simulated drops result
console.log(simulateDrops(data, 10000));
