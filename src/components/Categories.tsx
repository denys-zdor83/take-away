import React from "react"
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate"

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
}

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed']

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    // TODO delete after debuging
    useWhyDidYouUpdate('Categories', { value, onChangeCategory })

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
)