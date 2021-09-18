const baseUrl = `http://localhost:49764`;

export const productService = {
    getAll,
    get,
    create,
    update,
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
    return fetch(baseUrl + '/api/product/' + id, { method: 'DELETE' })
        .then((response) => {
            if (response.ok)
                console.log(response);
            return response;
        })
        .error((error) => {
            console.log(error);
        });
}

function get(id) {
    return fetch(baseUrl + '/api/product/' + id, { method: 'GET'});
}

function create(jsonData) {
    return fetch(baseUrl + '/api/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    })
}

function update(id, jsonData) {
    return fetch(baseUrl + '/api/product/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    })
}
