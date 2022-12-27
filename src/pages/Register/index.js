import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { db } from '../../firebaseConnection';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import { addDoc, collection } from 'firebase/firestore';


export default function Register() {
    const { name, setName } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault()
        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    if (password === confirmPassword) {
                        navigate('/admin', { replace: true })
                    } else {
                        setError('As senhas precisam ser iguais.')
                    }
                })
                .catch(() => {
                    if (password.length && confirmPassword.length < 6) {
                        setError('As senhas precisam ser iguais.')
                    } else {
                        setError('Email já cadastrado.')
                    }
                })

                addDoc(collection(db, 'user'), {
                    userName: name,
                    email: email,
                })

        } else {
            alert('Preencha todos os campos.')
        }
    }

    return (
        <div className='home-container'>
            <h1>Cadastre-se</h1>
            <span className='subtitle'>Vamos criar sua conta!</span>

            <form onSubmit={handleRegister} className='form'>
                <label className='label'>Nome</label>
                <input
                    type='text'
                    placeholder='Nome.'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className='label'>Email</label>
                <input
                    type='email'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className='label'>Senha</label>
                <input
                    type='password'
                    placeholder='**********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className='label'>Confirmar senha</label>
                <input
                    type='password'
                    placeholder='**********'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type='submit'>Cadastrar</button>

                <Link className='btn-link' to='/'>
                    Já possui uma conta? Faça Login!
                </Link>
            </form>
            <span className='error'>{error}</span>
        </div>
    )
}