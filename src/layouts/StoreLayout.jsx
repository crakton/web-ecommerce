import { Outlet } from "react-router-dom";
import Footer from "../components/user/Landing/Footer";
import ProfessionalNavbar from "../components/user/navbar/navbar";

const StoreLayout = ({ title, navs }) => {
  
  return (
      <main className="">
        <ProfessionalNavbar />
        <div className="">
          <Outlet  />
        <Footer />
        </div>
      </main>
    
  );
};

export default StoreLayout;
