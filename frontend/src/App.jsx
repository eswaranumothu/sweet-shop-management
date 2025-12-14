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
    <div className="app-wrapper">
      <div className="container">
        <div className="card">
          {showRegister ? (
            <>
              <Register onRegistered={() => setShowRegister(false)} />
              
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

      {/* ✅ FOOTER */}
      <footer className="footer">
        Sweet Shop Management System · Incubyte Assessment · Eswar Anumothu
      </footer>
    </div>
  );
}

export default App;
