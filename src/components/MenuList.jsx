
import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories from menu items
  const categories = [
    'All',
    ...new Set(items.map((item) => item.category))
  ]

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory)

  return (
    <div>
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? 'category-btn active'
                : 'category-btn'
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="muted">
        Showing {filteredItems.length} item(s)
      </p>

      {filteredItems.length === 0 ? (
        <p className="muted">
          No items found in this category.
        </p>
      ) : (
        <div className="grid">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuList
