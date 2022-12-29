import RoutesApp from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './contexts/user';

import Icons from './components/Icons'


export default function App() {
  return (
    <div className='App'>
      <UserProvider>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
        <ToastContainer autoClose={1500} />
      </UserProvider>
      <Icons/>
    </div>

  )
}