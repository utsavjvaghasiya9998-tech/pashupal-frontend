import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdAttachMoney } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CommonTable } from "../../components/CommomTable";
import { Pagination } from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("adminToken");

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get(
                `${API_URL}/expense/all?page=${page}&limit=10`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setExpenses(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            console.error("FETCH EXPENSE ERROR:", err);
            setError("Failed to load expenses");
        } finally {
            setLoading(false);
        }
    }, [token, page]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;

        try {
            await axios.delete(`${API_URL}/expense/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchExpenses();
        } catch (err) {
            alert("Failed to delete expense");
        }
    };

    if (error) return <div className="p-6 text-red-600">{error}</div>;

    // ✅ TABLE COLUMNS
    const columns = [
        {
            header: "Date",
            render: (exp) => new Date(exp.date).toLocaleDateString(),
        },
        {
            header: "Type",
            render: (exp) => (
                <span className="capitalize font-medium">{exp.type}</span>
            ),
        },
        {
            header: "Title",
            accessor: "title",
        },
        {
            header: "Amount",
            render: (exp) => (
                <span className="font-semibold text-green-700">
                    ₹ {exp.amount}
                </span>
            ),
        },
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MdAttachMoney className="text-3xl text-green-700" />
                    <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
                </div>

                <NavLink
                    to="/expense/add"
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    <MdAdd className="text-xl" />
                    <span>Add Expense</span>
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={expenses}
                loading={loading}
                emptyMessage="No expenses found"
                actions={(exp) => (
                    <button
                        onClick={() => handleDelete(exp._id)}
                        className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                        title="Delete"
                    >
                        <MdDelete />
                    </button>
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
