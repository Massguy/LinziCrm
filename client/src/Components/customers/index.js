import React, { useEffect, useState } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import { getAuthHeader2 } from "../../utils/tools";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Table from 'react-bootstrap/Table'
import CustomerDashboard from "./customerDashboard";


const Customers = (props) => {

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = ({selected}) => {
  
    setCurrentPage(selected + 1)
  };
  useEffect(() => {
    const fetchList = async () => {
      const result = await axios.get(`https://api.unleashedsoftware.com/Customers/${currentPage}?pageSize=${15}`, getAuthHeader2());
    
      console.log(result.data);
      setCustomers(result.data);
      setLoading(false);
    };
    fetchList();
  }, [currentPage]);

  return (
    <DashboardLayout>
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
