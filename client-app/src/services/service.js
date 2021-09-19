const baseUrl = `http://localhost:49764`;
const productAPI = baseUrl + '/api/product/';

export const productService = {
    getAll,
    get,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetch(productAPI)
        .then((response) => response.json())
        .catch((apiError) => apiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetch(productAPI + id, { method: 'DELETE' });
}

function get(id) {
    return fetch(productAPI + id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
}

function create(jsonData) {
    return fetch(productAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}

function update(id, jsonData) {
    return fetch(productAPI + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}
