import { useEffect } from 'react';
import { productService } from '../services/service';

export default function useFetchCreateOrUpdateProduct(id, handleGetResponse, handleSubmitResponse, handleError, closeModal) {
    const isAddMode = !id;

    useEffect(() => {
        if (!isAddMode) {
            return productService.get(id)
                .then((data) => {
                    handleGetResponse(data);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    });

    function onSubmit(data) {
        let historyPage;
        data["dateCreated"] = new Date().toISOString();

        if (!isAddMode) {
            data["productId"] = id;
        }

        let jsonData = JSON.stringify(data);
        let promiseService = (isAddMode) ? productService.create(jsonData) : productService.update(id, jsonData)

        return promiseService
            .then(()=> {
                handleSubmitResponse(historyPage);
                closeModal();
            })
            .catch((error) => {
                handleError(error);
            });
    }

    return { onSubmit };
}