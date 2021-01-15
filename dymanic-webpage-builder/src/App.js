import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./components/Navbar.js";
import ContentPage from "./components/index.js";

function App() {
  return (
    <div>
      <Navigationbar />
      <ContentPage />
    </div>
  );
}
export default App;
