import './error.css';
import { AiTwotoneHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Error() {
    return(
        <div className='error-container'>
            <span className='error-img'>404</span>
           <h1>Page not found</h1>
           <Link to="/"><button className='home-btn'>Go to Home</button></Link>
        </div>
    )
}