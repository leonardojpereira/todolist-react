import './icons.css';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

function Icons() {
    return(
        <div className="icon-container">
            <a className="icon linkedin" target='blank' href='https://www.linkedin.com/in/leonardo-barbosa-24b1ab190/'><BsLinkedin/></a>
            <a className="icon github" target='blank' href='https://github.com/leonardojpereira'><BsGithub/></a>
        </div>
    );
}

export default Icons;