// Not used
// TODO: Use to generate the database structure
const themeOptions = {
  colorTheme: ["light", "dark"],
  fontCategory: ["sans-serif", "serif"],
  showImage: [true, false],
  showNavbar: [true, false],
  centerText: [true, false],
};

const database = [
  {
    name: "colorTheme",
    options: [
      { value: "light", ratings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
      { value: "dark", ratings: [2, 2, 3, 2] },
      { value: "orange", ratings: [5, 5, 1, 1, 1, 5, 5] },
    ],
  },
  {
    name: "fontCategory",
    options: [
      { value: "sans-serif", ratings: [3, 1, 3, 5, 2, 3] },
      { value: "serif", ratings: [1, 3, 5, 6, 3, 2, 1, 3, 1] },
    ],
  },
  {
    name: "showImage",
    options: [
      { value: true, ratings: [4, 1, 1] },
      { value: false, ratings: [1, 3, 5, 5, 3, 2] },
    ],
  },
  {
    name: "showNavbar",
    options: [
      { value: true, ratings: [2, 3, 2, 5] },
      { value: false, ratings: [5, 3, 5, 1, 3] },
    ],
  },
  {
    name: "centerText",
    options: [
      { value: true, ratings: [2, 3, 2, 5] },
      { value: false, ratings: [5, 3, 5, 1, 3] },
    ],
  },
];

const generateTheme = () => {
  const softmax = arr => {
    return arr.map(value => {
      return Math.exp(value) / arr.map(y => Math.exp(y)).reduce((a, b) => a + b);
    });
  };

  const getOptions = options => {
    return options.map(item => item.value);
  };

  const averageRating = rating => {
    return rating.reduce((a, b) => a + b) / rating.length;
  };

  const getBiases = options => {
    return softmax(
      options.map(item => {
        let ratings = item.ratings;
        ratings = fillRest(ratings, 2.5, 10);
        console.log(ratings);
        return averageRating(item.ratings);
      })
    );
  };

  function fillRest(array, fill, min) {
    if (array.length >= min) {
      console.log(true);
      return array;
    } else {
      let difference = min - array.length;
      return [...array, ...Array(difference > 0 ? difference : 0).fill(fill)];
    }
  }

  const randomWithBias = (options, biases) => {
    let sum = 0;
    const cumulativeBias = biases.map(function (x) {
      sum += x;
      return sum;
    });

    const choice = Math.random() * sum;

    let chosenIndex = null;
    cumulativeBias.some((el, i) => {
      return el > choice ? ((chosenIndex = i), true) : false;
    });

    return options[chosenIndex];
  };

  return database.reduce((acc, feature) => {
    const result = randomWithBias(getOptions(feature.options), getBiases(feature.options));

    return { ...acc, [feature.name]: result };
  }, {});
};

console.log(generateTheme());
