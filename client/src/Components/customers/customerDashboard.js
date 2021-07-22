import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';
const CustomerDashboard = ({customerCode,customerName,phoneNumber,email,id}) => {
    return (<>
    <Table striped bordered hover >
    <tbody>
        <tr>
    <td style={{width:"10%"}}>{customerCode}</td>
 
    <td style={{width:"35%"}}>   <Link to={`/dashboard/admin/customers/${id}`}>{customerName}</Link></td>
   
    <td style={{width:"20%"}}>{phoneNumber}</td>
    <td style={{width:"35%"}}>{email}</td>
    </tr>
    </tbody>
    </Table>
    </>  );
}
 
export default CustomerDashboard;