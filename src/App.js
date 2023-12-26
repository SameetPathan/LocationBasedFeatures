
import './App.css';
import LocationComponent from './Location';
import Navbar from './Navbar';
import FooterComponent from './FooterComponent';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='mt-5 mb-5'><LocationComponent></LocationComponent></div>
      
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
