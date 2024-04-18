import { useState } from 'react'

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const [activeCategory, setActiveCategory] = useState(0)

  const onCategoryClick = (index) => {
    setActiveCategory(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li 
              onClick={() => onCategoryClick(index)} 
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