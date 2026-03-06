import React from 'react';

function CategoryNav() {
  const categories = [
    ['Pain Relief', 'Cold and Flu', 'Diabetes Care', 'Digestive Health', 'First Aid'],
    ['Skin Care', 'Child and Baby Care', 'Heart Health', 'Eye and Ear Care', 'Respiratory Health']
  ];

  return (
    <nav className="category-nav">
      <div className="category-container">
        <ul className="category-list">
          {categories.map((group, groupIndex) => (
            <div className="lis" key={groupIndex}>
              {group.map((category, index) => (
                <li key={index}>
                  <a href="#">{category}</a>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default CategoryNav;