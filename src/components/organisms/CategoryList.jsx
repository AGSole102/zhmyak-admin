import React from "react";
import CategoryCard from "../atoms/CategoryCard";

const CategoryList = ({ categories, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {categories.map((category) => (
      <CategoryCard
        key={category.name}
        category={category}
        onEdit={() => onEdit(category)}
        onDelete={() => onDelete(category)}
      />
    ))}
  </div>
);

export default CategoryList; 