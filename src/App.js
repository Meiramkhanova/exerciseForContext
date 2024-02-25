import "./App.css";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Container />
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          Use Dark Mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Container() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Panel title="The Login Page">
      {currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
}

function Greeting() {
  let { currentUser } = useContext(CurrentUserContext);
  let { setCurrentUser } = useContext(CurrentUserContext);
  return (
    <div>
      <p>You logged in as {currentUser.name}</p>
      <Button onClick={() => setCurrentUser(null)}>Log Out</Button>
    </div>
  );
}

function LoginForm() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName.trim() !== "" && lastName.trim() !== "";

  return (
    <>
      <label>
        First Name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({ name: firstName + "" + lastName });
        }}
      >
        Log In
      </Button>
      {!canLogin && <i> Fill in both fields </i>}
    </>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = "panel" + theme;
  return (
    <div className={className}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = "button" + theme;
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
