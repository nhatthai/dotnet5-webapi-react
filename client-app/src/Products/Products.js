import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://localhost:44374';

    useEffect(() => {
        fetch(baseUrl + '/api/product')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProducts(data.results)
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function deleteProduct(productId) {
        return fetch(baseUrl + '/api/product/' + productId, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    setProducts(products => products.filter(x => x.productId !== productId));
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateProduct(productId) {

    }

    function createProduct() {

    }

    return (
        <div className="padding-table">
            <h1>Product </h1>
            <Button onClick={() => createProduct()} className="btn btn-sm btn-success mb-2">Add Product</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Code</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length > 0 && products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.code}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <Button className="btn btn-sm btn-primary mb-2" onClick={() => updateProduct(product.productId)}>Update</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button className="btn btn-sm btn-danger mb-2" onClick={() => deleteProduct(product.productId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}

                    { loading &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                    }

                    { error &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="p-2">System failed</div>
                        </td>
                    </tr>
                    }

                    { !loading && !error && products && products.length === 0 &&
                    <tr>
                        <td colSpan="5" className="text-center">
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