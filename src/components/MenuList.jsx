
import MenuItemCard from './MenuItemCard.jsx'
import useCart from '../hooks/useCart.js'

function MenuList({
  items,
  categories = [],
  selectedCategory = 'All',
  onSelectCategory
}) {
  const { addToCart } = useCart()

  const availableCategories = [
    'All',
    ...categories.filter((category) => category !== 'All')
  ]

  return (
    <div>
      {/* Category filter buttons */}
      <div className="category-filters">
        {availableCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? 'category-btn active'
                : 'category-btn'
            }
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="muted">
        Showing {items.length} item(s)
      </p>

      {/* Display filtered menu */}
      {items.length === 0 ? (
        <p className="muted">
          No items found in this category.
        </p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuList
