import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdPets } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


const API_URL = import.meta.env.VITE_API_URL;

export const Animal = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchAnimals = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${API_URL}/animals/all?page=${page}&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAnimals(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            console.error(err);
            setError("Failed to load animals");
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchAnimals();
    }, [fetchAnimals]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this animal?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/animals/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchAnimals();
        } catch (err) {
            alert("Failed to delete animal");
        }
    };

    // ✅ TABLE COLUMNS
    const columns = [
        { header: "Tag ID", accessor: "tagId" },
        { header: "Species", accessor: "species" },
        { header: "Breed", accessor: "breed" },
        { header: "Age", accessor: "age" },
        {
            header: "Health",
            render: (animal) => (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {animal.healthStatus}
                </span>
            ),
        },
        {
            header: "Status",
            render: (animal) => (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {animal.currentStatus}
                </span>
            ),
        },
    ];

    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MdPets className="text-3xl text-green-700" />
                    <h1 className="text-2xl font-bold text-gray-800">Animals</h1>
                </div>

                <NavLink
                    to="/animals/add"
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    <MdAdd className="text-xl" />
                    <span>Add Animal</span>
                </NavLink>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable
                columns={columns}
                data={animals}
                loading={loading}
                emptyMessage="No animals found"
                actions={(animal) => (
                    <>
                        <NavLink
                            to={`/animals/edit/${animal._id}`}
                            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                        >
                            <FaEdit />
                        </NavLink>

                        <button
                            onClick={() => handleDelete(animal._id)}
                            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded"
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
