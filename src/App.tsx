import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState<string>("");
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event.target.value.length >= 1 && disable) {
      setError("Email non valide !");
    }

    if (event.target.value.length === 0 && disable) {
      setError("");
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      setError("");
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const sendEmail = (data: string) => {
    if (data && !disable) {
      console.log(data);
      fetch(
        `https://us-central1-celtic-science-372409.cloudfunctions.net/Test-1?data=${data}`
      ).then((res: any) => console.log(res));
    } else {
      setError("Email non valide !");
    }
  };
  return (
    <div className="App">
      <h1>Tape ton email 😄</h1>
      <input type="email" value={email} onChange={handleChange} /> <br />
      <button disabled={disable} type="button" onClick={() => sendEmail(email)}>
        Envoyer
      </button>
      <p style={{ position: "absolute", marginTop: "300px" }}>{error}</p>
    </div>
  );
}

export default App;
