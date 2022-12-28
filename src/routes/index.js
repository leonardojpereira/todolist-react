import  { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Error from '../pages/Error';

import Private from './Private'
function RoutesApp() {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<Private><Admin/></Private>}/>

            <Route path='*' element={<Error/>}/>
        </Routes>
    )
}

export default RoutesApp;