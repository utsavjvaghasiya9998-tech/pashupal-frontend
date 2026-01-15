import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdLocalDrink } from "react-icons/md";
import { Pagination } from "../../components/Pagination";
import { CommonTable } from "../../components/CommomTable";


const API_URL = import.meta.env.VITE_API_URL;

export const CustomerMilkHistory = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user.id;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${API_URL}/milk-sell/user/${id}?page=${page}&limit=5`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setHistory(res.data.data || []);
                setTotalPages(res.data.pagination?.totalPages || 1);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [API_URL, token, id, page]);

    // ✅ TABLE COLUMNS
    const columns = [
        {
            header: "Date",
            render: (item) => new Date(item.date).toLocaleDateString(),
            bold: true,
        },
        { header: "Quantity (L)", accessor: "quantity" },
        {
            header: "Price/L",
            render: (item) => `₹ ${item.pricePerLiter}`,
        },
        {
            header: "Total",
            render: (item) => (
                <span className="font-semibold">₹ {item.totalPrice}</span>
            ),
        },
        {
            header: "Status",
            render: (item) =>
                item.paymentStatus === "paid" ? (
                    <span className="text-green-700 font-semibold">Paid</span>
                ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                ),
        },
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MdLocalDrink className="text-3xl text-green-700" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Customer Milk History
                    </h1>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 border px-4 py-2 rounded"
                >
                    <MdArrowBack />
                    Back
                </button>
            </div>

            {/* ✅ COMMON TABLE */}
            <CommonTable    
                columns={columns}
                data={history}
                loading={loading}
                emptyMessage="No history found"
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
