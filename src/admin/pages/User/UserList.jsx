import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const firstLoadRef = useRef(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const fetchUsers = useCallback(async (silent = false) => {
        try {
            if (firstLoadRef.current && !silent) {
                setLoading(true);
            }

            setError("");

            const res = await axios.get(
                `${API_URL}/user/all?page=${page}&limit=5`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newData = res.data.data || [];

            setUsers((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(newData)) {
                    return prev;
                }
                return newData;
            });

            setTotalPages(res.data.pagination?.totalPages || 1);
            firstLoadRef.current = false;
        } catch (err) {
            console.error("FETCH USER ERROR:", err);
            setError(err.response?.data?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    }, [API_URL, token, page]);

    useEffect(() => {
        fetchUsers(false);
    }, [fetchUsers]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`${API_URL}/user/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchUsers(false);
        } catch (err) {
            console.error("DELETE USER ERROR:", err);
            alert(err.response?.data?.message || "Failed to delete user");
        }
    };

    if (error) {
        return (
            <div className="p-6 text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    // ✅ TABLE COLUMNS
    const columns = [
        {
            header: "Name",
            accessor: "name",
            bold: true,
        },
        {
            header: "Phone",
            render: (user) => user.phone || "-",
        },
        {
            header: "Address",
            render: (user) => user.address || "-",
        },
        {
            header: "Total Milk (L)",
            render: (user) => (
                <span className="font-semibold text-right block">
                    {user.totalMilkTaken || 0}
                </span>
            ),
        },
        {
            header: "Total Amount (₹)",
            render: (user) => (
                <span className="font-semibold text-green-700 text-right block">
                    ₹ {user.totalAmount || 0}
                </span>
            ),
        },
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Customers</h1>

                <NavLink
                    to="/customer/add"
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    + Add Customer
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={users}
                loading={loading}
                emptyMessage="No customers found"
                actions={(user) => (
                    <div className="flex justify-center gap-3">
                        <NavLink
                            to={`/customer/edit/${user._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                            title="View Customer"
                        >
                            <FaEdit className="text-lg" />
                        </NavLink>

                        <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                            title="Delete Customer"
                        >
                            <MdDelete className="text-lg" />
                        </button>
                    </div>
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
