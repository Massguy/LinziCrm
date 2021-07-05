import React from 'react';
import Table from 'react-bootstrap/Table'
const CustomerDashboard = ({customerCode,customerName,phoneNumber,email}) => {
    return (<>
    <Table striped bordered hover >
    <tbody>
        <tr>
    <td style={{width:"10%"}}>{customerCode}</td>
    <td style={{width:"35%"}}>{customerName}</td>
    <td style={{width:"20%"}}>{phoneNumber}</td>
    <td style={{width:"35%"}}>{email}</td>
    </tr>
    </tbody>
    </Table>
    </>  );
}
 
export default CustomerDashboard;