import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { productService } from '../services/service';

function AddProduct({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules
    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        code: Yup.string().required('Code is required'),
        price: Yup.number().required('Price is required'),
        quantity: Yup.number().required('Quantity is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (!isAddMode) {
            return productService.get(id).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                const fields = ['productName', 'code', 'price', 'quantity'];
                fields.forEach(field => setValue(field, data[field]));
            })
            .catch((error) => {
                console.error(error);
            });
        }
    });

    function onSubmit(data) {
        return createOrUpdateProduct(data);
    }

    function createOrUpdateProduct(data) {
        let historyPage;
        data["dateCreated"] = new Date().toISOString();

        if (isAddMode) {
            historyPage = '.';
        } else {
            data["productId"] = id;
            historyPage = '..';
        }

        var jsonData = JSON.stringify(data);
        var fetchService = (isAddMode) ? productService.create(jsonData) : productService.update(id, jsonData)

        return fetchService.then((response) => {
                if (response.ok) {
                    history.push(historyPage);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset} className="product-form">
                <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input id="name" name="productName" type="text" ref={register} className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.productName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label >Code</label>
                        <input id="code" name="code" type="text" ref={register} className={`form-control ${errors.code ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.code?.message}</div>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input id="price "name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.price?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input id="quantity" name="quantity" type="text" ref={register} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.quantity?.message}</div>
                    </div>
                </div>
                <div className="form-group btn-margin" >
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export { AddProduct };