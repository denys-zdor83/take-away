import Pepperoni from '../img/pizzas/pepperoni.png'
import PepperoniFresh from '../img/pizzas/pepperoni-fresh.png'
import Cheese from '../img/pizzas/cheese.png'
import BBQChicken from '../img/pizzas/bbq-chicken.png'
import SweetChilliShrimp from '../img/pizzas/sweet-chilli-shrimp.png'
import CheeseburgerPizza from '../img/pizzas/cheeseburger-pizza.png'
import DoublePepperoni from '../img/pizzas/double-pepperoni.png'
import Margarita from '../img/pizzas/margarita.png'
import FourSeasons from '../img/pizzas/four-seasons.png'
import VegetablesMushrooms from '../img/pizzas/vegetables-mushrooms.png'

const pizzas = [
  {
    "id": 0,
    "imageUrl": PepperoniFresh,
    "title": "Pepperoni fresh with pepper",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 30,
    "category": 0,
    "rating": 4
  },
  {
    "id": 1,
    "imageUrl": Cheese,
    "title": "Cheese",
    "types": [0],
    "sizes": [26, 40],
    "price": 24,
    "category": 0,
    "rating": 6
  },
  {
    "id": 2,
    "imageUrl": BBQChicken,
    "title": "BBQ chicken",
    "types": [0],
    "sizes": [26, 40],
    "price": 29,
    "category": 1,
    "rating": 4
  },
  {
    "id": 3,
    "imageUrl": SweetChilliShrimp,
    "title": "Sweet chilli shrimp",
    "types": [1],
    "sizes": [26, 30, 40],
    "price": 27,
    "category": 2,
    "rating": 2
  },
  {
    "id": 4,
    "imageUrl": CheeseburgerPizza,
    "title": "Cheeseburger pizza",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 41,
    "category": 3,
    "rating": 8
  },
  {
    "id": 5,
    "imageUrl": DoublePepperoni,
    "title": "Double pepperoni",
    "types": [0],
    "sizes": [30, 40],
    "price": 20,
    "category": 2,
    "rating": 2
  },
  {
    "id": 6,
    "imageUrl": Pepperoni,
    "title": "Pepperoni",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 23,
    "category": 1,
    "rating": 9
  },
  {
    "id": 7,
    "imageUrl": Margarita,
    "title": "Margarita",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 22,
    "category": 4,
    "rating": 10
  },
  {
    "id": 8,
    "imageUrl": FourSeasons,
    "title": "Four seasons",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 32,
    "category": 5,
    "rating": 10
  },
  {
    "id": 9,
    "imageUrl": VegetablesMushrooms,
    "title": "Vegetables and mushrooms",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 28,
    "category": 5,
    "rating": 7
  }
]

export default pizzas