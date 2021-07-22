import React, { useEffect, useState } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";

import axios from 'axios';
import ReactPaginate from "react-paginate";
import Table from 'react-bootstrap/Table'
import CustomerDashboard from "./customerDashboard";
import SearchBox from "./searchbox";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';


const Customers = (props) => {

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField,setSearchField] = useState('');
  const auth_id = 'f6500cfe-5991-422f-aa8d-fd18a814e47b'
  const auth_key = 'VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ=='
  

  const handlePageClick = ({selected}) => {
  
    setCurrentPage(selected + 1)
  };
  useEffect(() => {
    const getAuthHeader2 = () => {
      const hmacSignature = Base64.stringify(hmacSHA256(`pageSize=15&&customer=${searchField}`, auth_key))
      return { headers: { 
          //'Authorization':`Bearer ${getTokenCookie()}`, 
          "content-Type": 'application/json',
          "Accept" : "application/json",
          "api-auth-id": auth_id,
          "api-auth-signature": hmacSignature,
          "client-type": "linzi"
      }}
  }
    const fetchList = async () => {
      const result = await axios.get(`https://api.unleashedsoftware.com/Customers/${currentPage}?pageSize=${15}&&customer=${searchField}`, getAuthHeader2());
     
      
      setCustomers(result.data);
   
      setLoading(false);
    };
    fetchList();
  }, [currentPage,searchField]);

  return (
    <DashboardLayout>
      <h1>LJ Customers</h1>
      <SearchBox placeholder="search Customer by Name or customer code" handleChange={(e)=>setSearchField(e.target.value)}/>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th style={{width:"10%"}}>Code</th>
                    <th style={{width:"35%"}}>Customer Name</th>
                    <th style={{width:"20%"}}> Phone Number</th>
                    <th style={{width:"35%"}}>Email</th>
                  </tr>
                </thead>
              </Table>
              {customers.Items.map((data, i) => {
                return (
                  <div key={i}>
                    
                    <CustomerDashboard
                      customerCode={data.CustomerCode}
                      customerName={data.CustomerName}
                      phoneNumber={data.PhoneNumber}
                      id={data.Guid}
                      email={data.Email === null ? 'nil':data.Email.slice(0,32)}
                    />
                  </div>
                );
              })}
              <ReactPaginate
                previousLabel={"Prev"}
                onPageChange={handlePageClick}
                pageCount={customers.Pagination.NumberOfPages}
                nextLabel={"Next"}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttns"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Customers;
