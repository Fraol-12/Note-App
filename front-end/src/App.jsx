import { useEffect } from "react";
import api from "./api"

function App() {
useEffect(() => {
  api.get("./notes")
    .then(res => console.log(res.data))
    .catch(Err => console.log(err.response?.status))

}, []);
  return (
    <>
    <h1>Note App</h1>
    <h2>Axios Connected</h2>
    </>
  )
}

export default App
