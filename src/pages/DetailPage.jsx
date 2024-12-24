import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { id } = useParams(); // URL-dən id-ni əldə edirik
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getOrderDetails(id){
    await axios.get("http://localhost:3000/orders/" + id)
    .then((respo) =>{
        console.log(respo.data);
        setLoading(false)
        setOrderDetails(respo.data)
    })
  };

  useEffect(() => {
    getOrderDetails(id);
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Order Details for ID: {id}</h2>
      <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
      <p><strong>Orders:</strong> {orderDetails.orders}</p>
      <p><strong>Address:</strong> {orderDetails.Address}</p>
      <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
      {/* Burada orderDetails obyektindən digər məlumatları da göstərmək olar */}
    </div>
  );
}

export default DetailPage;
