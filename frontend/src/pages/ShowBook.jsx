/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4 bg-gray-900 min-h-screen text-white'>
            <BackButton />
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-4xl font-bold text-center my-8'>Book Details</h1>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='bg-gray-800 p-8 rounded-lg shadow-lg'>
                        <div className='mb-6'>
                            <h2 className='text-3xl font-semibold text-sky-400 mb-4'>Book Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <span className='block text-gray-400'>ID</span>
                                    <span className='block text-2xl'>{book._id}</span>
                                </div>
                                <div>
                                    <span className='block text-gray-400'>Title</span>
                                    <span className='block text-2xl'>{book.title}</span>
                                </div>
                                <div>
                                    <span className='block text-gray-400'>Author</span>
                                    <span className='block text-2xl'>{book.author}</span>
                                </div>
                                <div>
                                    <span className='block text-gray-400'>Publish Year</span>
                                    <span className='block text-2xl'>{book.publishYear}</span>
                                </div>
                                <div>
                                    <span className='block text-gray-400'>Created At</span>
                                    <span className='block text-2xl'>{new Date(book.createdAt).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className='block text-gray-400'>Updated At</span>
                                    <span className='block text-2xl'>{new Date(book.updatedAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowBook;
