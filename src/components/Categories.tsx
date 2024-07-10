import React from "react"

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
}

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed']

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li 
              onClick={() => onChangeCategory(index)} 
              className={value === index ? 'active' : ''} 
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