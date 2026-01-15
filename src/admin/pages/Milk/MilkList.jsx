import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdLocalDrink } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


const API_URL = import.meta.env.VITE_API_URL;

export const Milk = () => {
    const [milkRecords, setMilkRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMilk = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${API_URL}/worker/totalmilk?page=${page}&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMilkRecords(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            setError("Failed to load milk records");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMilk();
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/worker/milk/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchMilk();
        } catch (err) {
            alert("Failed to delete record");
        }
    };

    if (error) return <div className="p-6 text-red-600">{error}</div>;

    // ✅ TABLE COLUMNS
    const columns = [
        {
            header: "Animal",
            render: (record) => record?.animal?.tagId || "N/A",
            bold: true,
        },
        {
            header: "Date",
            render: (record) =>
                new Date(record.date).toLocaleDateString(),
        },
        { header: "Morning", accessor: "morningYield" },
        { header: "Evening", accessor: "eveningYield" },
        {
            header: "Total",
            render: (record) => (
                <span className="font-semibold text-gray-800">
                    {record.totalYield}
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
                    <h1 className="text-2xl font-bold text-gray-800">Milk Records</h1>
                </div>

                <NavLink
                    to="/milk/add"
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    <MdAdd className="text-xl" />
                    <span>Add Milk</span>
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={milkRecords}
                loading={loading}
                emptyMessage="No milk records found"
                actions={(record) => (
                    <>
                        <NavLink
                            to={`/milk/edit/${record._id}`}
                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                            <FaEdit className="text-lg" />
                        </NavLink>

                        <button
                            onClick={() => handleDelete(record._id)}
                            className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                            <MdDelete className="text-lg" />
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
