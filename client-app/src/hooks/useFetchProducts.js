import { useState, useEffect } from 'react';
import { productService } from '../services/service';

export default function useFetchProducts() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getAll()
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
        return productService.delete(productId)
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

    return { products, loading, error, deleteProduct };
}