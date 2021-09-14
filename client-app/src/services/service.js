import { fromFetch } from 'rxjs/fetch';

const baseUrl = `http://localhost:49764`;

export const productService = {
    getAll,
    getProducts,
    delete: _delete,
};

// const handleResponse = (response) =>{
//     if (response.ok) {
//       return response.json();
//     } else {
//         console.error(response)
//     }
//  }

function getAll() {
    return fetch(baseUrl + '/api/product')
        .then((response) => response.json())
        .catch((apiError) => apiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(baseUrl + '/api/product/' + id, requestOptions)
        .then((response) => {
            if (response.ok)
                console.log(response);
            return response;
        })
        .error((error) => {
            console.log(error);
        });
}

function getProducts() {
    return fromFetch(baseUrl + '/api/product');
}
//         .pipe(
//             switchMap((response) => handleResponse(response)),
//             map((response) => response.results),
//             catchError((error) => {
//                 console.error(error);
//                 return of({ error: true, message: error.message });
//             }));
