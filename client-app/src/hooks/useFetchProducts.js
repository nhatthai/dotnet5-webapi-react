import { useState, useEffect } from 'react';

export default function useFetchProducts() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const baseUrl = 'http://localhost:49764';

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

    return { products, loading, error };
}