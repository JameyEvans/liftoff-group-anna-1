﻿// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Popcorn = () => {

    const [popcorn, setPopcorn] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        fetch('popcorn')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setPopcorn(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Popcorn List</h1>

                {popcorn.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {popcorn.map((popcornItem) => (
                                <tr key={popcornItem.id}>
                                    <td>{popcornItem.name}</td>
                                    <td>{popcornItem.description}</td>
                                    <td>{popcornItem.popcornPrice}</td>
                                    <td>{popcornItem.quantity}</td>
                                    <td>
                                        <Link to={`/popcorn/edit/${popcornItem.id}`}>Edit</Link>
                                        {' | '}
                                        <a onClick={handleDelete(popcornItem.id)}>DeleteAnchor</a>
                                        <Link to={`/popcorn/delete/${popcornItem.id}`}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {popcorn.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/popcorn/create">Create Popcorn Item</Link></p>
            </div>
        </main>
    );
};

export default Popcorn;
