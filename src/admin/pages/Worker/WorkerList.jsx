import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


export const Workers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const firstLoadRef = useRef(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const fetchWorkers = useCallback(async (silent = false) => {
        try {
            if (firstLoadRef.current && !silent) {
                setLoading(true);
            }

            setError("");

            const res = await axios.get(
                `${API_URL}/worker/all?page=${page}&limit=5`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newData = res.data.data || [];

            // ✅ Update only if changed
            setWorkers((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(newData)) {
                    return prev;
                }
                return newData;
            });

            setTotalPages(res.data.pagination?.totalPages || 1);
            firstLoadRef.current = false;
        } catch (err) {
            console.error("FETCH WORKER ERROR:", err);
            setError(err.response?.data?.message || "Failed to load workers");
        } finally {
            setLoading(false);
        }
    }, [API_URL, token, page]);

    useEffect(() => {
        fetchWorkers(false);

        const interval = setInterval(() => {
            fetchWorkers(true); // silent refresh
        }, 15000);

        return () => clearInterval(interval);
    }, [fetchWorkers]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this worker?")) return;

        try {
            await axios.delete(`${API_URL}/worker/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchWorkers(false);
        } catch (err) {
            console.error("DELETE WORKER ERROR:", err);
            alert(err.response?.data?.message || "Failed to delete worker");
        }
    };

    // ❌ Error UI
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
            header: "Email",
            accessor: "email",
        },
        {
            header: "Phone",
            render: (worker) => worker.phone || "-",
        },
        {
            header: "Status",
            render: (worker) =>
                worker.status === "active" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                    </span>
                ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Inactive
                    </span>
                ),
        },
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Workers</h1>

                <NavLink
                    to="/worker/add"
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    + Add Worker
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={workers}
                loading={loading}
                emptyMessage="No workers found"
                actions={(worker) => (
                    <>
                        <NavLink
                            to={`/worker/edit/${worker._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Edit
                        </NavLink>

                        <button
                            onClick={() => handleDelete(worker._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Delete
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
