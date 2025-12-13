import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) {
    return (
      <Sweets
        onLogout={() => {
          localStorage.clear();
          setLoggedIn(false);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="card">
        {showRegister ? (
          <>
            <Register onRegistered={() => setShowRegister(false)} />
            <p className="register-text">
              Already have an account?{" "}
              <span onClick={() => setShowRegister(false)}>Login</span>
            </p>
          </>
        ) : (
          <>
            <Login
              onLogin={() => setLoggedIn(true)}
              onRegister={() => setShowRegister(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
