import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then(response => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4 bg-gray-900 min-h-screen text-white'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Online Book Store</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-400 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto">
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-gray-700 rounded-md bg-gray-800'>No</th>
                                <th className='border border-gray-700 rounded-md bg-gray-800'>Title</th>
                                <th className='border border-gray-700 rounded-md bg-gray-800 max-md:hidden'>Author</th>
                                <th className='border border-gray-700 rounded-md bg-gray-800 max-md:hidden'>Publish Year</th>
                                <th className='border border-gray-700 rounded-md bg-gray-800'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id} className='h-12'>
                                    <td className='border border-gray-700 rounded-md text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-gray-700 rounded-md text-center'>
                                        {book.title}
                                    </td>
                                    <td className='border border-gray-700 rounded-md text-center max-md:hidden'>
                                        {book.author}
                                    </td>
                                    <td className='border border-gray-700 rounded-md text-center max-md:hidden'>
                                        {book.publishYear}
                                    </td>
                                    <td className='border border-gray-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/books/details/${book._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-400' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-400' />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-400' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Home;
