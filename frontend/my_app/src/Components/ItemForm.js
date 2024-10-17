import React, { useState } from 'react';

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [availability, setAvailability] = useState(false);
  const [categoryId, setCategoryId] = useState(8); // Default category

  const categories = [
    { id: 1, name: 'Baby & Kids' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Tools & Equipment' },
    { id: 4, name: 'Furniture' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Health & Fitness' },
    { id: 7, name: 'Outdoor' },
    { id: 8, name: 'Clothes' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      itemName,
      description,
      pricePerDay: parseFloat(pricePerDay),
      imageUrl,
      availability,
      category_id: categoryId,
    };

    try {
      const response = await fetch('http://localhost:5004/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item added:', result);
        alert('Item added successfully!');
        // Optionally, reset the form or update state here
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price per Day"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={availability}
          onChange={() => setAvailability(!availability)}
        />
        Available
      </label>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
