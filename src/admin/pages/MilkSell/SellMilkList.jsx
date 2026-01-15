import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
    MdAdd,
    MdLocalDrink,
    MdDelete,
    MdEdit,
} from "react-icons/md";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


const API_URL = import.meta.env.VITE_API_URL;

export const MilkSell = () => {
    const token = localStorage.getItem("token");

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSales = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API_URL}/milk-sell/all?page=${page}&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSales(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            console.error("FETCH MILK SALES ERROR:", err);
            setError("Failed to load milk sales");
        } finally {
            setLoading(false);
        }
    }, [token, page]);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this sale?")) return;

        try {
            await axios.delete(`${API_URL}/milk-sell/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchSales();
        } catch (err) {
            alert("Failed to delete sale");
        }
    };

    if (error) return <div className="p-6 text-red-600">{error}</div>;

    // ✅ TABLE COLUMNS
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

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MdLocalDrink className="text-3xl text-green-700" />
                    <h1 className="text-2xl font-bold text-gray-800">Milk Sales</h1>
                </div>

                <NavLink
                    to="/admin/milk-sell/add"
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    <MdAdd className="text-xl" />
                    <span>Add Sale</span>
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={sales}
                loading={loading}
                emptyMessage="No milk sales found"
                actions={(sale) => (
                    <>
                        <NavLink
                            to={`/admin/milk-sell/edit/${sale._id}`}
                            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                            title="Edit"
                        >
                            <MdEdit />
                        </NavLink>

                        <button
                            onClick={() => handleDelete(sale._id)}
                            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                            title="Delete"
                        >
                            <MdDelete />
                        </button>
                    </>
                )}
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
