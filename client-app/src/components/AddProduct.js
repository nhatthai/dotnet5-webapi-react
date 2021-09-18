import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function AddProduct({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const baseUrl = 'http://localhost:49764';

    // form validation rules
    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Product Name is required'),
        code: Yup.string()
            .required('Code is required'),
        price: Yup.number()
            .required('Price is required'),
        quantity: Yup.number()
            .required('Quantity is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (!isAddMode) {
            // get product and set form fields
            return fetch(baseUrl + '/api/product/' + id, { method: 'GET' })
                .then((response) => {
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
        return isAddMode ? createOrUpdateProduct("", data) : createOrUpdateProduct(id, data);
    }

    function createOrUpdateProduct(id, data) {
        let method;
        let historyPage;

        if (id !== "") {
            data["productId"] = id;
            method = 'PUT';
            historyPage = '..';
        } else {
            method = 'POST';
            historyPage = '.';
        }

        data["dateCreated"] = new Date().toISOString();
        var jsonData = JSON.stringify(data);

        return fetch(baseUrl + '/api/product/' + id, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body:jsonData
            })
            .then((response) => {
                if (response.ok) {
                    history.push(historyPage);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div class="container">
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset} class="product-form">
                <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input name="productName" type="text" ref={register} className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.productName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Code</label>
                        <input name="code" type="text" ref={register} className={`form-control ${errors.code ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.code?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.price?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input name="quantity" type="text" ref={register} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.quantity?.message}</div>
                    </div>
                </div>
                <div className="form-group">
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