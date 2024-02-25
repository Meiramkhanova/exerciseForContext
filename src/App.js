import "./App.css";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Container />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        Use Dark Mode
      </label>
    </ThemeContext.Provider>
  );
}

function Container() {
  return (
    <Panel title="Hello">
      <Button>Sign Up</Button>
      <Button>Log in </Button>
    </Panel>
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
function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = "button" + theme;
  return <button className={className}>{children}</button>;
}
