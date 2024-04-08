import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebaseConfig";
import Modal from './Modal';

// Import CSS file for styles

export default function Docs({ database }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [title, setTitle] = useState('');
    const collectionRef = collection(database, 'docsData');
    const isMounted = useRef();
    const [docsData, setDocsData] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Error signing out: ', error);
            toast.error('Failed to log out', { autoClose: 2000 });
        });
    };

    const addData = () => {
        addDoc(collectionRef, { title: title })
            .then(() => {
                toast.success('Data added', { autoClose: 2000 });
            })
            .catch(() => {
                toast.error('Cannot Save Document', { autoClose: 2000 });
            });
    };

    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(
                data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
    };

    useEffect(() => {
        if (isMounted.current) {
            return;
        }

        isMounted.current = true;
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(collectionRef, id));
            toast.success('Document deleted', { autoClose: 2000 });
        } catch (error) {
            console.error('Error deleting document: ', error);
            toast.error('Failed to delete document', { autoClose: 2000 });
        }
    };

    const getID = (id) => {
        navigate(`/editDocs/${id}`);
    };

    // Check if user is authenticated, redirect to login if not
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="docs-main">
            <ToastContainer />
            <div className="header">
                <h1 className="docs-heading">Docs</h1>
                <button className="add-docs" onClick={handleOpen}>Add a Document</button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />
            {docsData.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className='grid-main'>
                    {docsData.map((doc) => {
                        return (
                            <div className='grid-child' key={doc.id}>
                                <p>{doc.title}</p>
                                <div className='button-container-grid'>
                                    <button className="delete-button" onClick={() => handleDelete(doc.id)}>Delete</button>
                                    <button className="edit-button" onClick={() => getID(doc.id)}>Edit</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
