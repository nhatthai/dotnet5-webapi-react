import { Observable } from 'rxjs';

const baseUrl = `http://localhost:57119`;

export const productService = {
    getAll
};

function getAll() {
    return new Observable((subscriber) => {
        fetch(baseUrl + '/api/product')
          .then((response) => response.json())
          .catch((apiError) => subscriber.error(apiError));
      });
}

// console.log('Starting request ...')
// const subscription = getUsers().subscribe(
//   // onNext callback
//   (users) => {
//     console.log(`Received ${users.length} users`)
//   },
//   // onError callback
//   (error) => {
//     console.error('There has been an error', error)
//   },
//   // onComplete callback
//   () => {
//     console.log('Request finished')
//   }
// )
