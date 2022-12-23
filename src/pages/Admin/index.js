import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import './admin.css';
import { isElectron } from '@firebase/util';
export default function Admin() {
    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState({});

    const [task, setTask] = useState([]);
    useEffect(() => {
        async function loadTask() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail));

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const taskRef = collection(db, 'task')
                const q = query(taskRef, orderBy('created', 'desc'), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid
                        })
                    })

                    setTask(lista);

                })
            }

        }

        loadTask();
    }, [])

    async function handleRegister(e) {
        e.preventDefault()

        if (taskInput === '') {
            alert('Digite sua tarefa...')
            return;
        }

        if(edit?.id) {
            handleUpdateTask();
            return;
        }

        await addDoc(collection(db, 'task'), {
            task: taskInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log('Tarefa registrada!')
                setTaskInput('');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTask(id) {
        const docRef = doc(db, 'task', id)
        await deleteDoc(docRef);
    }

    function editTask(item) {
        setTaskInput(item.task);
        setEdit(item);
    }

    async function handleUpdateTask() {
       const docRef = doc(db, 'task', edit?.id)
       await updateDoc(docRef, {
        task: taskInput,
       })
       .then(() => {
        console.log('Tareaf atualizada.')
        setTaskInput('')
        setEdit('')
       })
       .catch(() => {
        console.log('Erro ao atualizar.')
        setTaskInput('')
        setEdit({})
       })
    }

    return (
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua tafera...'
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{backgroundColor: '#6add39'}} type='submit'>Editar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            </form>

            {task.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.task}</p>

                    <div>
                        <button onClick={() => editTask(item)} >Editar</button>
                        <button onClick={() => deleteTask(item.id)} className='btn-done'>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}