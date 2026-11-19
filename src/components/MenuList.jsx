
import MenuItemCard from './MenuItemCard.jsx'
import useCart from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  // Each user gets their own category preference.
  // Guests use All and do not save their selection.
  const storageKey = user
    ? 'ce-category-' + user.uid
    : null

  const [preferredCategory, setPreferredCategory] =
    useLocalStorage(storageKey, 'All')

  const categories = [
    'All',
    ...new Set(items.map((item) => item.category))
  ]

  const selectedCategory = categories.includes(preferredCategory)
    ? preferredCategory
    : 'All'

  function handleSelect(category) {
    setPreferredCategory(category)
  }

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter(
          (item) => item.category === selectedCategory
        )

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
              onAdd={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuList
