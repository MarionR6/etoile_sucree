import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import styles from "./App.module.scss";

function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>

    </AuthProvider>
  );
}

export default App;
