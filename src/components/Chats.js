import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }
    useEffect(() => {
        if (!user) {
            history.push('/');
            return
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "4d1181dc-3846-4296-adbd-2b3e27aa613b",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL).then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users', formdata, {
                        headers: {
                            "private-key": "dc28e2a8-0266-4bcd-b98f-0f3d33d0e392"

                        }
                    }).then(() => {
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error)
                    })
                })
            })
    }, [user, history]);

    if (!user || loading) return "Loading...."
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="4d1181dc-3846-4296-adbd-2b3e27aa613b"
                userName={user.email}
                userSecret={user.uid} />
        </div>
    );
}

export default Chats