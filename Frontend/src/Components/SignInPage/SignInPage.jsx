import "./SignInPage.css";

const SignInPage = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Sign In</button>
        </form>
        <p className="create-new">Create New</p>
      </div>
    </div>
  );
};

export default SignInPage;
