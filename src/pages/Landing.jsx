import { useState } from "react";

function Landing({ goToDashboard }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="page active">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <h3 className="logo">⏱️ ClockDat Task</h3>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn-primary" onClick={() => setShowSignup(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Organize Your Life Beautifully</h1>
        <p>A simple and elegant todo list to keep you productive</p>
        <div className="hero-buttons">
          <button className="btn-large" onClick={() => setShowSignup(true)}>
            Get Started Free
          </button>
          <button className="btn-outline" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About ClockDat Task</h2>
        <p>
          ClockDat Task is a beautiful and simple <strong>todo list app</strong>{" "}
          that helps you stay <strong>organized</strong>. Create tasks, mark them
          complete, and manage your daily activities with ease.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-light">
        <h2>FAQ</h2>
        <div className="faq-item">
          <h3>Is it free?</h3>
          <p>Yes! ClockDat Task is completely free to use.</p>
        </div>
        <div className="faq-item">
          <h3>How do I get started?</h3>
          <p>Just click "Get Started Free" and create your account!</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Awogo Blessing — Made with 💖</p>
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal active">
          <div className="modal-box">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <h2>Welcome Back!</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToDashboard();
              }}
            >
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button className="btn-primary btn-full">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="modal active">
          <div className="modal-box">
            <span className="close" onClick={() => setShowSignup(false)}>
              &times;
            </span>
            <h2>⏱️ ClockDat Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToDashboard();
              }}
            >
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button className="btn-primary btn-full">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
