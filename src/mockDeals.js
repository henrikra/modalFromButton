const randomIntegerBetween = (from, to) => Math.floor(Math.random() * to) + from;
const getRandomImage = () => 
  `https://unsplash.it/30${randomIntegerBetween(0, 9)}/25${randomIntegerBetween(0, 9)}`;

export default [
  {
    title: 'Hotel Jeilou',
    price: 560,
    image: getRandomImage(),
  }, 
  {
    title: 'Hotel functionalen',
    price: 320,
    image: getRandomImage(),
  }, 
  {
    title: 'Native Hotel',
    price: 5300,
    image: getRandomImage(),
  }, 
  {
    title: 'Yellow rose hotel',
    price: 50,
    image: getRandomImage(),
  }, 
  {
    title: 'Foodoraas Hotel',
    price: 630,
    image: getRandomImage(),
  }, 
  {
    title: 'Wolt Hotel',
    price: 990,
    image: getRandomImage(),
  }
];