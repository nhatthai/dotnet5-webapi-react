import React from 'react';
import { Table } from 'react-bootstrap';

class Products extends React.Component {
    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Code</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}
export { Products };