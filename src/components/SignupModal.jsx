function SignupModal({ onClose }) {
  return (
    <div className="modal active">
      <div className="modal-box">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <h2>⏱️ ClockDat Task</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button className="btn-primary btn-full">Sign Up</button>
        </form>

        <p>
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupModal;
