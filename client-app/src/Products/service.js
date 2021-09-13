const baseUrl = `https://localhost:44374`;

export const productService = {
    getAll,
    delete: _delete
};

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
