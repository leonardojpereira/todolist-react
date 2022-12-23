import RoutesApp from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
      <ToastContainer autoClose={1500}/>
    </div>

  )
}