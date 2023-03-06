// Define the droptable
// const data = {
//   rare: 34.5,
//   mythic: 11.5,
//   legendary: 8,
// };
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

const simulateDrops = (input, amount) => {
  // Define the variable to be returned
  let result = {};

  // Copy the keys from our input variable
  for (const key in input) {
    result[key] = 0;
  }

  // Loop through "amount" times
  for (i = 0; i < amount; i++) {
    // Loop through the input
    for (const key in input) {
      // Define our "chance"
      var d = Math.random() * 100;
      // Calculate and add the result to the return variable
      if (d < input[key]) {
        result[key]++;
      }
    }
  }

  // Retun the result
  return result;
};

// Log the simulated drops result
console.log(simulateDrops(data, 100));
