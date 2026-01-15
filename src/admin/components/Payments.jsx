import { useEffect, useState } from "react";
import axios from "axios";
import { MdLocalDrink, MdCurrencyRupee } from "react-icons/md";
import { CommonTable } from "./CommomTable";
import { Pagination } from "./Pagination";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

const UserPayments = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [unpaidAmount, setUnpaidAmount] = useState(0);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/milk-sell/user/${user.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = res.data.data || [];
                setRecords(data);

                let total = 0;
                let unpaid = 0;

                data.forEach((r) => {
                    total += Number(r.totalPrice || 0);
                    if (r.paymentStatus === "unpaid") {
                        unpaid += Number(r.totalPrice || 0);
                    }
                });

                setTotalAmount(total);
                setUnpaidAmount(unpaid);

            } catch (err) {
                console.error("PAYMENTS FETCH ERROR:", err);
                setError("Failed to load payments");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);
    const columns = [
        {
            header: "Date",
            render: (sale) =>
                sale.date ? new Date(sale.date).toLocaleDateString() : "-",
        },
        {
            header: "Customer",
            render: (sale) => sale.user?.name || "N/A",
            bold: true,
        },
        { header: "Morning", accessor: "morningYield" },
        { header: "Evening", accessor: "eveningYield" },
        {
            header: "Price / L",
            render: (sale) => `₹ ${sale.pricePerLiter}`,
        },
        {
            header: "Total",
            render: (sale) => (
                <span className="font-semibold text-gray-800">
                    ₹ {sale.totalPrice}
                </span>
            ),
        },
        {
            header: "Payment",
            render: (sale) =>
                sale.paymentStatus === "paid" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Paid
                    </span>
                ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Unpaid
                    </span>
                ),
        },
    ];

    if (loading) {
    return <Loader text="Loading animal details..." />;
}
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-4 md:p-6">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-xl shadow mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <MdCurrencyRupee /> My Payments
                </h1>
                <p className="text-green-100 text-sm">
                    View your milk bill & payment status
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-green-700">
                        ₹ {totalAmount}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">Unpaid Amount</p>
                    <p className="text-2xl font-bold text-red-600">
                        ₹ {unpaidAmount}
                    </p>
                </div>
            </div>

            <CommonTable
                columns={columns}
                data={records}
                loading={loading}
                emptyMessage="No milk sales found"
               />

            {/* ✅ Pagination */}
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default UserPayments;
