import './index.css'

const CategoryTabs = ({categories, activeCategoryId, onChange}) => (
  <div className="tabs-container">
    <ul data-testid="table_menu_list" className="tabs-scroll">
      {categories.map(category => (
        <li key={category.menu_category_id}>
          <button
            type="button"
            className={
              category.menu_category_id === activeCategoryId
                ? 'tab-button active'
                : 'tab-button'
            }
            onClick={() => onChange(category.menu_category_id)}
          >
            {category.menu_category}
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default CategoryTabs
