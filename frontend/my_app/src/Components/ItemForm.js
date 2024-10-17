import React, { useState } from 'react';

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [availability, setAvailability] = useState(false);
  const [categoryId, setCategoryId] = useState(1);
  const [renterId] = useState(1); // Set your default RenterID here
  const [image, setImage] = useState(null); // State to handle image file

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Tools & Equipment' },
    { id: 4, name: 'Furniture' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Baby & Kids' },
    { id: 7, name: 'Health & Fitness' },
    { id: 8, name: 'Outdoor' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('pricePerDay', pricePerDay);
    formData.append('availability', availability);
    formData.append('category_id', categoryId);
    formData.append('renter_id', renterId); // Include renterId in the FormData
    formData.append('image', image); // Append the image file

    try {
      const response = await fetch('http://localhost:5004/items', {
        method: 'POST',
        body: formData, // Send form data with image and other details
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item added:', result);
        alert('Item added successfully!');
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
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Handle image file input
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

      {/* Hidden input for renterId */}
      <input
      type="hidden"
      value={renterId}
      readOnly
      />

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
