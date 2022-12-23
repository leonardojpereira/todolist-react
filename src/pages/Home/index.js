import { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault()
        if(email !== '' && password !== '')  {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                //navegar para /admin
                navigate('/admin', {replace: true})
            })
            .catch(() => {
                console.log('Erro ao fazer login.')
            })

        } else {
            alert('preencha todos os campos!')
        }
    }

    return (
        <div className='home-container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda de forma fácil.</span>

            <form onSubmit={handleLogin} className='form'>
                <input
                    type='text'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                 <input
                    type='password'
                    placeholder='**********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Acessar</button>

                <Link className='btn-link' to='/register'>
                    Não possui uma conta? Cadastre-se
                </Link>
            </form>
        </div>
    )
}