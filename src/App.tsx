import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState<string>("");
  const [disable, setDisable] = useState(true);
  const [nickel, setNickel] = useState(false);
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
      )
        .then((res: any) => {
          if (res.ok) {
            setNickel(true);
            console.log(res);
          } else {
            setError("Ups il y a eu un problème 🤯");
          }
        })
        .catch(() => setError("Ups il y a eu un problème 🤯"));
    } else {
      setError("Email non valide !");
    }
  };
  return (
    <div className="App">
      <h1>Tape ton email 😄</h1>
      <input type="email" value={email} onChange={handleChange} /> <br />
      {!nickel ? (
        <button
          disabled={disable}
          type="button"
          onClick={() => {
            setError("");
            sendEmail(email);
          }}
        >
          Envoyer
        </button>
      ) : (
        <p>Message envoyé ! 😊</p>
      )}
      <p style={{ position: "absolute", marginTop: "300px", color: "red" }}>
        {error}
      </p>
    </div>
  );
}

export default App;
