import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Table = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCustomerName, setNewCustomerName] = useState("")
    const [newAddress, setNewAddress] = useState("")
    const [newOrderName, setNewOrderName] = useState("")

    function handleGetOrderById(id) {
        axios.get("http://localhost:3000/orders/" + id).then((response) => {
            setSelectedOrder(response.data);
        });
    }

    function handleDelete(id) {
        async function deleteOrder(id) {
            await axios.delete("http://localhost:3000/orders/" + id)
            let filtered = orders.filter(order => order.id !== id)
            setOrders(filtered)
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete order!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your order has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    function getDatas() {
        axios
            .get("http://localhost:3000/orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleSumit(e) {
        e.preventDefault();
        const newOrder = {
            customerName: newCustomerName,
            orders: newOrderName,
            Address: newAddress,
            orderDate: new Date().toISOString(),
        };

        axios
            .post("http://localhost:3000/orders", newOrder)
            .then((response) => {
                setOrders([...orders, response.data]);
                setNewCustomerName("");
                setNewOrderName("");
                setNewAddress("");
                Swal.fire({
                    title: "Success!",
                    text: "Order added successfully.",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error("Error adding order:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem adding the order.",
                    icon: "error",
                });
            });
    }

    function handleUpdateOrder(updatedOrder) {
        axios
            .put("http://localhost:3000/orders/" + updatedOrder.id, updatedOrder)
            .then((response) => {
                const updatedOrders = orders.map(order =>
                    order.id === updatedOrder.id ? updatedOrder : order
                );
                setOrders(updatedOrders);
                Swal.fire({
                    title: "Updated!",
                    text: "The order has been updated.",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error("Error updating order:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem updating the order.",
                    icon: "error"
                });
            });
    }

    useEffect(() => {
        getDatas();
    }, []);

    if (loading) {
        return <div className="text-center mt-20 text-xl">Loading...</div>;
    }

    return (
        <>
            <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={(e) => handleSumit(e)}>
                <h1 className="text-3xl font-semibold text-gray-800 mt-4 mb-6 shadow-md">Add Order</h1>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Customer Name
                    </label>
                    <input
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter customer name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orders" className="block text-sm font-medium text-gray-700">
                        Orders
                    </label>
                    <input
                        value={newOrderName}
                        onChange={(e) => setNewOrderName(e.target.value)}
                        type="text"
                        id="orders"
                        name="orders"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter orders"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        type="text"
                        id="address"
                        name="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter address"
                        required
                    />
                </div>
                <button
                    className="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            <div className="container mx-auto p-10 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-5">Orders Table</h1>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Customer Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ship Address</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Orders</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="px-6 py-4 text-gray-900">{order.customerName || "N/A"}</td>
                                <td className="px-6 py-4 text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</td>

                                <td className="px-6 py-4 text-gray-600">{order.Address || "N/A"}</td>
                                <td className="px-6 py-4 text-gray-600">{order.orders || "N/A"}</td>
                                <td>
                                    <Link to={`/table/${order.id}`}><button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onClick={() => handleGetOrderById(order.id)}
                                    >
                                        Order Details
                                    </button></Link>
                                </td>
                                <td>
                                <Link to={`/table/${order.id}`}><button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        
                                    >
                                        Update
                                    </button></Link>
                                </td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
                                        onClick={() => handleDelete(order.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
};

export default Table;
