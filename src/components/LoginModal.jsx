function LoginModal({ onClose }) {
  return (
    <div className="modal active">
      <div className="modal-box">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <h2>Welcome Back!</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button className="btn-primary btn-full">Login</button>
        </form>

        <p>
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}


export default LoginModal;