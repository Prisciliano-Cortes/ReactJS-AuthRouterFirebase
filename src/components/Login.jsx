import React, { useState, useCallback } from 'react';
import { auth, db } from '../firebase';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(true);

    const procesarDatos = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Ingrese Email");
            return;
        }

        if (!pass.trim()) {
            setError("Ingrese Password");
            return;
        }

        if (pass.length < 6) {
            setError("La contraseña debe tener una longitud de 6 o más caracteres");
            return;
        }

        setError(null);
        
        if (esRegistro) {
            registrar()
        } else {
            login()
        }
    }

    const login = useCallback( async() => {

        try {
            
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user);

            setEmail('');
            setPass('');
            setError(null);
            props.history.push('/admin');

        } catch (error) {
            console.log(error);

            if (error.code === 'auth/invalid-email') {
                setError('El email no es válido');    
            }

            if (error.code === 'auth/user-not-found') {
                setError('Este email no está registrado'); 
            }

            if (error.code === 'auth/wrong-password') {
                setError('La contraseña es incorrecto'); 
            }

        }
    }, [email, pass, props.history])

    const registrar = useCallback( async() => {

        try {
            
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
            })
            setEmail('');
            setPass('');
            setError(null);
            props.history.push('/admin');

            console.log(res.user);

        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                setError('El email no es válido');    
            }

            if (error.code === 'auth/email-already-in-use') {
                setError('Este email ya se encuentra registrado'); 
            }
            
        }

    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>

            <hr />

            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 co-xl-4">
                    <form onSubmit={ procesarDatos }>

                        {
                            error && 
                            (
                                <div className="alert alert-danger">
                                    { error }
                                </div>
                            )
                        }

                        <input 
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                        />

                        <input 
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese una contraseña"
                            value={pass}
                            onChange={e => setPass(e.target.value) }
                        /> 

                        <button 
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                        
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>

                        <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={ () => setEsRegistro(!esRegistro) }
                            type="button"
                        >
                            {
                                esRegistro ? '¿Ya estás registrado?' : '¿No tienes cuenta?'
                            }
                        </button>

                        {
                            !esRegistro ?
                            (
                                <button 
                                    className="btn btn-lg btn-danger btn-sm mt-2"
                                    type="button"
                                    onClick={ () => props.history.push('/reset')}
                                >
                                    Recuperar contraseña
                                </button>
                            )
                            :
                            null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)