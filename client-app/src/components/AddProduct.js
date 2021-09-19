import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useFetchCreateOrUpdateProduct from '../hooks/useFetchProduct';

function AddProduct({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const { onSubmit } =
        useFetchCreateOrUpdateProduct(id, handleGetProductResponse, handleSubmitResponse, handleError);

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

    function handleGetProductResponse(data) {
        const fields = ['productName', 'code', 'price', 'quantity'];
        fields.forEach(field => setValue(field, data[field]));
    }

    function handleError(error) {
        console.error(error);
    }

    function handleSubmitResponse(historyPage) {
        history.push(historyPage);
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