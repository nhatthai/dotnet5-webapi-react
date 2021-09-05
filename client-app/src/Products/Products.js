import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productService } from './Service/service';


function Products({ match }) {
    const { path } = match;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        //productService.getAll().then(x => setProducts(x));

        // const subscription = fromFetch('//...')
        //     .subscribe(response =>
        //         response.json().then(data => setData(data))
        //     );

        // // this function will be called on component unmount
        // // it will terminate the fetching
        // return () => subscription.unsubscribe();
    }, []);

    // function deleteProduct(id) {
    //     setProducts(products.map(x => {
    //         if (x.id === id) { x.isDeleting = true; }
    //         return x;
    //     }));
    //     // userService.delete(id).then(() => {
    //     //     setUsers(users => users.filter(x => x.id !== id));
    //     // });
    // };

    return (
        <div>
            <h1>Product</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Code</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    )}

                    {!products &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                    }

                    {products && !products.length &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="p-2">No products available</div>
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
}

export { Products };