import { useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";

const products = [
  { name: "Galaxy Ultra S26", category: "Smartphones", price: "₹1,24,999", rating: 4.8, icon: "📱" },
  { name: "ZenBook Pro 14", category: "Laptops", price: "₹89,990", rating: 4.7, icon: "💻" },
  { name: "SoundMax ANC Pro", category: "Audio", price: "₹14,499", rating: 4.6, icon: "🎧" },
  { name: "PulseFit Watch 3", category: "Wearables", price: "₹9,999", rating: 4.5, icon: "⌚" },
  { name: "Lumix Z Mirrorless", category: "Cameras", price: "₹74,500", rating: 4.7, icon: "📷" },
  { name: "PlayBox Series 5", category: "Gaming", price: "₹49,990", rating: 4.9, icon: "🎮" }
];

const states = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", "Maharashtra"];

/* ---------- Navigation Bar ---------- */
function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">E-<span>MART</span><small>ELECTRONICS</small></Link>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/register" className="nav-btn">Sign Up</NavLink>
      </nav>
    </header>
  );
}

/* ---------- Product Card (reusable) ---------- */
function ProductCard({ item }) {
  return (
    <article className="product-card">
      <div className="product-visual">{item.icon}</div>
      <div className="product-info">
        <span>{item.category}</span>
        <h3>{item.name}</h3>
        <div className="product-meta">
          <strong>{item.price}</strong>
          <p>★ {item.rating} / 5</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Home Page ---------- */
function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="tagline">⚡ INDIA'S SMART ELECTRONICS STORE</p>
          <h1>UPGRADE YOUR <span>DIGITAL LIFE.</span></h1>
          <p className="hero-text">
            Shop the latest smartphones, laptops, audio gear and smart gadgets at the
            best prices. Genuine products, fast delivery and easy returns.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">Shop Now →</Link>
            <Link to="/register" className="secondary-btn">Create Account</Link>
          </div>
          <div className="stats">
            <div><h2>25K+</h2><p>Happy Customers</p></div>
            <div><h2>1,200+</h2><p>Products</p></div>
            <div><h2>48 HR</h2><p>Delivery</p></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="ring ring-a"></div>
          <div className="ring ring-b"></div>
          <div className="device-card">
            <p className="device-label">E-MART / DEAL OF THE DAY</p>
            <div className="device-icon">💻</div>
            <h3>ZenBook Pro 14</h3>
            <p className="device-price">₹89,990 <s>₹1,04,990</s></p>
          </div>
          <span className="chip chip-a">🔥 14% OFF</span>
          <span className="chip chip-b">🚚 Free Delivery</span>
        </div>
      </section>

      <section className="featured">
        <p className="tagline">TRENDING THIS WEEK</p>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.slice(0, 3).map((item) => <ProductCard key={item.name} item={item} />)}
        </div>
      </section>
    </>
  );
}

/* ---------- Products Page ---------- */
function Products() {
  return (
    <section className="page-container">
      <p className="tagline">OUR CATALOGUE</p>
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map((item) => <ProductCard key={item.name} item={item} />)}
      </div>
    </section>
  );
}

/* ---------- About Page ---------- */
function About() {
  return (
    <section className="page-container about">
      <p className="tagline">WHO WE ARE</p>
      <h1>About E-MART</h1>
      <p>
        E-MART is an online electronics store that brings smartphones, laptops,
        audio devices, wearables and cameras together in one place. Our goal is to
        make buying electronics simple, safe and affordable for everyone.
      </p>
    </section>
  );
}

/* ---------- Registration Page with Validation ---------- */
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", age: "", mobile: "", gender: "", state: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function validate(f) {
    const errors = {};
    if (!/^[A-Za-z ]{3,}$/.test(f.name)) errors.name = "Name must have at least 3 letters";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(f.email)) errors.email = "Enter a valid email address";
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(f.password))
      errors.password = "Min 8 characters with 1 capital letter and 1 number";
    if (!(f.age >= 18 && f.age <= 100)) errors.age = "Age must be between 18 and 100";
    if (!/^[6-9]\d{9}$/.test(f.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
    if (!f.gender) errors.gender = "Select your gender";
    if (!f.state) errors.state = "Select your state";
    return errors;
  }

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) setSubmitted(true);
  }

  // show an error only after the user has typed in that field
  const show = (field) => form[field] !== "" && errors[field] && <small>{errors[field]}</small>;

  return (
    <section className="register-wrapper">
      <div className="register-card">
        <div className="register-heading">
          <div className="form-icon">🛒</div>
          <p className="tagline">JOIN E-MART</p>
          <h1>Create Account</h1>
          <p>Register to get exclusive deals and faster checkout.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
          {show("name")}

          <label>Email Address</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {show("email")}

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" />
          {show("password")}

          <div className="form-row">
            <div>
              <label>Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" />
              {show("age")}
            </div>
            <div>
              <label>Mobile Number</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit number" />
              {show("mobile")}
            </div>
          </div>

          <label>Gender</label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} /> {g}
              </label>
            ))}
          </div>

          <label>State</label>
          <select name="state" value={form.state} onChange={handleChange}>
            <option value="">Select your state</option>
            {states.map((s) => <option key={s}>{s}</option>)}
          </select>

          <button type="submit" className="submit-btn" disabled={!isValid}>REGISTER</button>
        </form>

        {submitted && (
          <div className="success">
            ✅ Welcome to E-MART, {form.name}! Your account was created successfully.
            <br />
            <button className="home-btn" onClick={() => navigate("/products")}>Start Shopping</button>
          </div>
        )}

        <p className="login-text">Already have an account? <Link to="/register">Login</Link></p>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer>
      <h2>E-<span>MART</span></h2>
      <p>Smart gadgets. Smart prices.</p>
      <p>© 2026 E-MART Electronics. All Rights Reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}
