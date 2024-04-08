import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore } from 'firebase/firestore';

export default function EditDocs({ database }) {
    const isMounted = useRef();
    const db = getFirestore();
    const collectionRef = collection(db, 'docsData');
    let params = useParams();
    const [documentTitle, setDocumentTitle] = useState('');
    const [docsDesc, setDocsDesc] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(collectionRef, params.id), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setDocumentTitle(data.title || '');
                setDocsDesc(data.docsDesc || '');
            } else {
                console.log("Document does not exist or data is undefined");
            }
        });

        return () => unsubscribe();
    }, [collectionRef, params.id]);

    const getQuillData = (() => {
        let timeoutId;
    
        return (value) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                updateDoc(doc(collectionRef, params.id), { docsDesc: value })
                    .then(() => {
                        toast.success('Document Saved', { autoClose: 2000 });
                    })
                    .catch(() => {
                        toast.error('Cannot Save Document', { autoClose: 2000 });
                    });
            }, 3000); // Delay saving for 3 seconds
        };
    })();
    

    return (
        <div className='editDocs-main'>
            <ToastContainer />
            <h1>{documentTitle}</h1>
            <div className='editDocs-inner'>
                <ReactQuill
                    className='react-quill'
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>
        </div>
    );
}
