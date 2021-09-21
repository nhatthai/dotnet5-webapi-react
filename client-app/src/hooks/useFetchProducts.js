import { useState, useEffect } from 'react';
import { productService } from '../services/service';

export default function useFetchProducts(handleGetResponse, closeForm) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(0);

    useEffect(() => {
        loadProducts();
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

    function getProduct(productId) {
        setProductId(productId);

        return productService.get(productId)
                .then((data) => {
                    handleGetResponse(data);
                })
                .catch((error) => {
                    //handleError(error);
                });
    }

    function loadProducts() {
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
    }

    function onSubmit(data) {
        data["dateCreated"] = new Date().toISOString();
        data["productId"] = productId;

        let jsonData = JSON.stringify(data);
        let promiseService = (productId === 0) ? productService.create(jsonData) : productService.update(productId, jsonData)

        return promiseService
            .then((e)=> {
                closeForm();
                loadProducts();
            })
            .catch((error) => {
                //handleError(error);
            });
    }

    return { products, loading, error, productId, onSubmit, deleteProduct,  getProduct };
}