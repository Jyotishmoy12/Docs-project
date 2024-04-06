import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditDocs({ database }) {
    const isMounted = useRef();
    const collectionRef = collection(database, 'docsData');
    let params = useParams();
    const [documentTitle, setDocumentTitle] = useState('');
    const [docsDesc, setDocsDesc] = useState('');

    const getQuillData = (value) => {
        setDocsDesc(value);
    };
    useEffect(() => {
      const updateDocsData = setTimeout(() => {
          const document = doc(collectionRef, params.id)
          updateDoc(document, {
              docsDesc: docsDesc
          })
              .then(() => {
                toast.success('Document Saved', {
                  autoClose: 2000
              })
              })
              .catch(() => {
                toast.error('Cannot Save Document', {
                  autoClose: 2000
              })
              })
      }, 1000)
      return () => clearTimeout(updateDocsData)
  }, [docsDesc])
    const getData = () => {
        const document = doc(collectionRef, params.id);
        onSnapshot(document, (docs) => {
            if (docs && docs.exists()) { // Check if docs is not undefined and exists
                const data = docs.data();
                setDocumentTitle(data.title || ''); // Set title to empty string if it's undefined
                setDocsDesc(data.docsDesc || '');
            } else {
                console.log("Document does not exist or data is undefined");
                // Handle the case where the document does not exist, e.g., navigate to a not found page
            }
        });
    };

    useEffect(() => {
        if (isMounted.current) {
            return;
        }

        isMounted.current = true;
        getData();
    }, []);

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
