import { useState } from 'react';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <div className='p-4 bg-gray-900 min-h-screen text-white'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col items-center border-2 border-red-500 rounded-lg w-full max-w-xl p-8 mx-auto bg-gray-800 shadow-lg'>
                    <h3 className='text-2xl mb-4'>Are you sure you want to delete this book?</h3>
                    <button
                        className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 w-full'
                        onClick={handleDeleteBook}
                    >
                        Yes, Delete it
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;
