const baseUrl = `https://localhost:44374`;

export const productService = {
    getAll
};

function getAll() {
    return fetch(baseUrl + '/api/product')
        .then((response) => response.json())
        .catch((apiError) => apiError);
}
