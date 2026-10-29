import { useSearchParams } from 'react-router'
import MenuItemCard from './MenuItemCard.jsx'
import useCart from '../hooks/useCart.js'

function MenuList({ items }) {
  const { addToCart } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()

  const categories = ['All', ...new Set(items.map((item) => item.category))]

  // Read the category from the URL; fall back to All if it is missing or unknown
  const cat = searchParams.get('cat')
  const selectedCategory = categories.includes(cat) ? cat : 'All'

  function handleSelect(category) {
    if (category === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: category })
    }
  }

  const filteredItems =
    selectedCategory === 'All'
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
            onClick={() => handleSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="muted">Showing {filteredItems.length} item(s)</p>

      {filteredItems.length === 0 ? (
        <p className="muted">No items found in this category.</p>
      ) : (
        <div className="grid">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuList