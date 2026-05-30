import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Store Catalog Items
  const products = {
    laptops: [
      { id: 'l1', name: 'MSI Katana GF66', desc: 'i7-12th Gen, RTX 3050', price: 899, img: '/laptop1.jpg' },
      { id: 'l2', name: 'MacBook Air M2', desc: '8GB RAM, 256GB SSD', price: 1099, img: '/laptop2.jpg' },
      { id: 'l3', name: 'ASUS Vivobook 15', desc: 'Ryzen 5, 8GB RAM', price: 550, img: '/laptop3.jpg' }
    ],
    components: [
      { id: 'c1', name: 'NVIDIA RTX 4070', desc: '12GB GDDR6X VRAM', price: 599, img: '/gpu.jpg' },
      { id: 'c2', name: 'Custom RGB Gaming Rig', desc: 'Intel Build, Premium Airflow Case', price: 1250, img: '/cpu.jpg' },
      { id: 'c3', name: 'Samsung 980 Pro 1TB', desc: 'NVMe M.2 Gen4 SSD', price: 95, img: '/ssd.jpg' }
    ],
    peripherals: [
      { id: 'p1', name: 'RGB Gaming Keyboard & Mouse Combo', desc: 'Mechanical Feel Backlit Set', price: 45, img: '/keyboard.jpg' },
      { id: 'p2', name: 'Logitech G502 Hero', desc: '25K DPI High Performance', price: 45, img: '/mouse.jpg' },
      { id: 'p3', name: 'HyperX Cloud II', desc: '7.1 Virtual Surround Sound', price: 85, img: '/headset.jpg' }
    ]
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="app-container">
      {/* Title Header */}
      <header className="header">
        <h1>Nabatieh Digital</h1>
        <p>Premium Tech Support & Hardware in South Lebanon</p>
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>Home</button>
        <button className={currentPage === 'store' ? 'active' : ''} onClick={() => setCurrentPage('store')}>Store</button>
        <button className={currentPage === 'specs' ? 'active' : ''} onClick={() => setCurrentPage('specs')}>Specifications</button>
        <button className={currentPage === 'contact' ? 'active' : ''} onClick={() => setCurrentPage('contact')}>Contact Us</button>
        <div className="nav-cart-summary">
          🛒 Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="main-content">
        {currentPage === 'home' && (
          <div className="page fade-in">
            <div className="banner">
              <h2>Up to 20% Off on Gaming Rigs</h2>
              <p>Visit our branch in Nabatieh for special discounts on custom builds and student upgrades.</p>
            </div>
            <section className="welcome-section">
              <h2>Welcome to Nabatieh Digital</h2>
              <p>We provide the finest computer builds, verified peripheral distributions, and technical consultation services in Southern Lebanon. Switch over to our Store tab to view our current catalog or verify build metrics under the Specifications tab.</p>
              <div className="student-alert-box">
                <h4>🎓 Student Discount Program</h4>
                <p>Bring your valid University Identification card to our physical location to claim a flat 10% structural discount on hardware accessories and peripherals!</p>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'store' && (
          <div className="page store-layout fade-in">
            <aside className="sidebar">
              <h3>Inventory Menu</h3>
              <ul>
                <li><a href="#laptops-cat">Laptops</a></li>
                <li><a href="#components-cat">Components</a></li>
                <li><a href="#peripherals-cat">Peripherals</a></li>
              </ul>
              <div className="cart-widget">
                <h3>Your Cart</h3>
                {cart.length === 0 ? <p>Cart is empty</p> : (
                  <div>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <span>{item.name} (x{item.qty})</span>
                        <button onClick={() => removeFromCart(item.id)}>❌</button>
                      </div>
                    ))}
                    <div className="cart-total"><strong>Total: ${cartTotal}</strong></div>
                    <button className="checkout-btn" onClick={() => alert('Proceeding to Checkout!')}>Checkout System</button>
                  </div>
                )}
              </div>
            </aside>

            <section className="catalog">
              <h2 id="laptops-cat" className="cat-title">Laptops & Notebooks</h2>
              <div className="row">
                {products.laptops.map(p => (
                  <div className="column" key={p.id}>
                    <div className="card">
                      <img src={p.img} alt={p.name} />
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <p className="price">${p.price}</p>
                      <button onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>

              <h2 id="components-cat" className="cat-title">PC Components</h2>
              <div className="row">
                {products.components.map(p => (
                  <div className="column" key={p.id}>
                    <div className="card">
                      <img src={p.img} alt={p.name} />
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <p className="price">${p.price}</p>
                      <button onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>

              <h2 id="peripherals-cat" className="cat-title">Gaming Peripherals</h2>
              <div className="row">
                {products.peripherals.map(p => (
                  <div className="column" key={p.id}>
                    <div className="card">
                      <img src={p.img} alt={p.name} />
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <p className="price">${p.price}</p>
                      <button onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'specs' && (
          <div className="page fade-in">
            <div className="info-box">
              <h2>Technical Specifications</h2>
              <p>Compare our standard pre-built deployment tiers directly.</p>
              <div className="table-responsive">
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Basic Build</th>
                      <th>Pro Build</th>
                      <th>Elite Build</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>CPU</td><td>Intel i3-12100</td><td>Intel i7-13700</td><td>Intel i9-14900K</td></tr>
                    <tr><td>GPU</td><td>GTX 1650</td><td>RTX 4060 Ti</td><td>RTX 4090</td></tr>
                    <tr><td>RAM</td><td>8GB DDR4</td><td>16GB DDR5</td><td>64GB DDR5</td></tr>
                    <tr><td>PSU</td><td>450W Bronze</td><td>650W Gold</td><td>1000W Platinum</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="info-box references">
              <h2>Expert Information Hub</h2>
              <p>Cross-examine system telemetry with industry benchmark indexes:</p>
              <ul className="links-list">
                <li><a href="https://www.techpowerup.com/gpu-specs/" target="_blank" rel="noreferrer">🔍 GPU Database (TechPowerUp)</a></li>
                <li><a href="https://www.cpubenchmark.net/" target="_blank" rel="noreferrer">📊 CPU PassMark Benchmarks</a></li>
                <li><a href="https://www.rtings.com/" target="_blank" rel="noreferrer">🖥️ Monitor & Peripheral Reviews</a></li>
                <li><a href="https://pcpartpicker.com/" target="_blank" rel="noreferrer">🛠️ PC Part Picker Compatibility Tracker</a></li>
              </ul>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="page fade-in">
            <div className="contact-section">
              <div className="contact-container">
                <div className="contact-form">
                  <h2>Send a Message</h2>
                  {formSubmitted ? (
                    <div className="success-message">🎉 Thank you! Your message has been sent successfully.</div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                      <input type="text" placeholder="Name" required />
                      <input type="email" placeholder="Email" required />
                      <textarea placeholder="Your inquiry..." required></textarea>
                      <button type="submit">Submit Message</button>
                    </form>
                  )}
                </div>
                <div className="contact-info">
                  <h2>Visit Us</h2>
                  <p><strong>Location:</strong> Main Street, Nabatieh, Lebanon</p>
                  <p><strong>Hotlines:</strong></p>
                  <p>+961 81 792 052</p>
                  <p>+961 81 670 804</p>
                  <p><strong>Working Hours:</strong> 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Nabatieh Digital &copy; 2026</p>
        <p>Created by Hadi Haydar and Hassan Hamdoun - Student Project CSCI390</p>
      </footer>
    </div>
  );
}

export default App;