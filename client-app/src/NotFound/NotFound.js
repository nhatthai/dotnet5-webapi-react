import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div class="App-header">
               <h3>Page Not Found</h3>
               <p>Please go back the <a href="/">home page</a></p>
            </div>
        );
    }
}

export { NotFound };