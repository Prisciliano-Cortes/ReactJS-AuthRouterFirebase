import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import Firestore from './Firestore';

const Admin = (props) => {

    const [user, setUser] = useState(null);

    useEffect( () => {
        if (auth.currentUser) {
            console.log('Existe un usuario');
            setUser(auth.currentUser);
        } else {
            console.log('No existe un usuario');
            props.history.push('/login');
        }
    }, [props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">Admin</h3>
            {
                user && 
                (
                    <Firestore user={user} />
                )
            }
        </div>
    )
}

export default withRouter(Admin)