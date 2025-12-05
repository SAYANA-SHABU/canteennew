import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodMenu.css';

const FoodMenu = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrderMode, setIsOrderMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch food items from backend
  const fetchFoodItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/menu");
      setFoodItems(res.data);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Calculate total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantityInCart);
    }, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleOrderNowClick = () => {
    setIsOrderMode(true);
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      // If item already in cart, increase quantity
      setCart(cart.map(cartItem => 
        cartItem._id === item._id 
          ? { ...cartItem, quantityInCart: cartItem.quantityInCart + 1 }
          : cartItem
      ));
    } else {
      // If item not in cart, add with quantity 1
      setCart([...cart, { ...item, quantityInCart: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    const existingItem = cart.find(item => item._id === itemId);
    
    if (existingItem.quantityInCart > 1) {
      // Decrease quantity
      setCart(cart.map(cartItem => 
        cartItem._id === itemId 
          ? { ...cartItem, quantityInCart: cartItem.quantityInCart - 1 }
          : cartItem
      ));
    } else {
      // Remove item completely
      setCart(cart.filter(item => item._id !== itemId));
    }
  };

  const handleBuyItem = async (itemId) => {
    try {
      await axios.put(`http://localhost:5000/menu/buy/${itemId}`);
      // Refresh items after purchase
      fetchFoodItems();
    } catch (err) {
      console.error("Failed to purchase item:", err);
      alert("Failed to process purchase. Please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      // Process all items in cart
      for (const item of cart) {
        for (let i = 0; i < item.quantityInCart; i++) {
          await handleBuyItem(item._id);
        }
      }
      
      alert(`Order placed successfully! Total: ₹${totalAmount}`);
      setCart([]);
      setIsOrderMode(false);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  // Filter items based on search
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find(item => item._id === itemId);
    return cartItem ? cartItem.quantityInCart : 0;
  };

  return (
    <div className="food-menu">
      <div className="menu-header">
        <h2 className="menu-title">Our Delicious Menu</h2>
        <p className="menu-subtitle">-Freshly prepared with love and care</p>
        
        {!isOrderMode && (
          <button className="start-order-btn" onClick={handleOrderNowClick}>
            🚀 START ORDERING
          </button>
        )}
      </div>

      <div className="menu-controls">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Display cart summary */}
      {isOrderMode && cart.length > 0 && (
        <div className="cart-summary">
          <h3>Your Order</h3>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-item-controls">
                <button onClick={() => handleRemoveFromCart(item._id)}>-</button>
                <span>{item.quantityInCart}</span>
                <button onClick={() => handleAddToCart(item)}>+</button>
                <span className="cart-item-price">₹{item.price * item.quantityInCart}</span>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h4>Total: ₹{totalAmount}</h4>
            <button className="checkout-btn" onClick={handleCheckout}>
              PLACE ORDER
            </button>
          </div>
        </div>
      )}

      {/* Using MenuPage style grid */}
      <div className="menu-container">
        <div className="menu-grid">
          {filteredItems.map(item => {
            const cartQuantity = getCartQuantity(item._id);
            
            return (
              <div key={item._id} className="menu-card">
                <img 
                  src={item.image || "https://via.placeholder.com/300x150"} 
                  alt={item.name} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity Available: {item.quantity}</p>
                
                {isOrderMode && item.quantity > 0 && (
                  <div className="order-controls">
                    {cartQuantity > 0 ? (
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span className="qty-display">{cartQuantity}</span>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="qty-btn"
                          disabled={item.quantity <= cartQuantity}
                        >
                          +
                        </button>
                        <span className="item-total">₹{item.price * cartQuantity}</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="add-to-cart-btn"
                      >
                        Add to Order
                      </button>
                    )}
                  </div>
                )}
                
                {isOrderMode && item.quantity <= 0 && (
                  <button className="out-of-stock-btn" disabled>
                    Out of Stock
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;