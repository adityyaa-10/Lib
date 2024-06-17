import { useState } from 'react';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios.post('http://localhost:5555/books', data)
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
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading && <Spinner />}
            <div className="flex flex-col border-2 border-sky-400 rounded-lg w-full max-w-xl p-6 mx-auto bg-gray-800 shadow-lg">
                <div className="my-4">
                    <label className='block text-xl text-gray-400 mb-2'>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-600 px-4 py-2 w-full rounded-md bg-gray-700 text-white focus:border-sky-400 focus:outline-none'
                    />
                </div>
                <div className="my-4">
                    <label className='block text-xl text-gray-400 mb-2'>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-600 px-4 py-2 w-full rounded-md bg-gray-700 text-white focus:border-sky-400 focus:outline-none'
                    />
                </div>
                <div className="my-4">
                    <label className='block text-xl text-gray-400 mb-2'>Publish Year</label>
                    <input
                        type="text"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-600 px-4 py-2 w-full rounded-md bg-gray-700 text-white focus:border-sky-400 focus:outline-none'
                    />
                </div>
                <button
                    className='px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition duration-300'
                    onClick={handleSaveBook}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateBook;
