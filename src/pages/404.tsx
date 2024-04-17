import "../styles/home.scss";
import Header from "../organisms/header";

function FourOhFour() {
  return (
    <div className="home-container">
      <Header />

      {/* <NavigationBar /> */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Uh oh, you're lost!</h1>
          <h2>404</h2>
        </div>
      </div>
    </div>
  );
}

export default FourOhFour;
