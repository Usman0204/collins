import '../../App.scss';
import Footer from './footer/Footer';
import Navbar from './header/Navbar';
import Banner from './main-banner/Banner';
const Landing=()=> {


  return (
    <>
    
    <div>
      <Navbar />
      <Banner />
      <Footer />
    </div>
    </>
  );
}

export default Landing;