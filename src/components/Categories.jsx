import { useState } from 'react'

function Categories() {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed']
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li 
              onClick={() => setActiveCategory(index)} 
              className={activeCategory === index ? 'active' : ''} 
              key={categoryName}
            >
              {categoryName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories