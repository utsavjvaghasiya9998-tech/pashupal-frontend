import { useState } from "react";
import axios from "axios";
import {
    MdAssessment,
    MdDateRange,
    MdLocalDrink,
    MdCurrencyRupee,
    MdWarning,
    MdSummarize,
    MdPictureAsPdf,
    MdTableChart,
} from "react-icons/md";
import { CommonTable } from "../components/CommomTable";

const API_URL = import.meta.env.VITE_API_URL;

export const Reports = () => {
    const token = localStorage.getItem("token");
    console.log("AUTH TOKEN RECEIVED:", token); // ✅ DEBUG LINE

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [type, setType] = useState("sales"); // sales | milk | due

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [summary, setSummary] = useState(null);
    const fetchReport = async () => {
        if (type !== "due" && (!from || !to)) {
            return alert("Please select From and To date");
        }

        try {
            setLoading(true);
            setError("");

            let url = "";

            if (type === "sales") {
                url = `${API_URL}/reports/sales?from=${from}&to=${to}`;
            } else if (type === "milk") {
                url = `${API_URL}/reports/milk?from=${from}&to=${to}`;
            } else if (type === "due") {
                url = `${API_URL}/reports/due`;
            } else if (type === "expense") {
                url = `${API_URL}/reports/expense?from=${from}&to=${to}`;
            }


            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setData(res.data.data || []);
            setSummary(res.data);
        } catch (err) {
            console.error("REPORT ERROR:", err);
            setError("Failed to load report");
        } finally {
            setLoading(false);
        }
    };

    // ================= EXPORT FUNCTIONS =================

    const exportPDF = () => {
        let url = "";

        if (type === "sales") {
            url = `${API_URL}/reports/sales/pdf?from=${from}&to=${to}&token=${token}`;
        } else if (type === "milk") {
            url = `${API_URL}/reports/milk/pdf?from=${from}&to=${to}&token=${token}`;
        } else if (type === "expense") {
            url = `${API_URL}/reports/expense/pdf?from=${from}&to=${to}&token=${token}`;
        }
        else {
            url = `${API_URL}/reports/due/pdf?token=${token}`;
        }

        window.open(url, "_blank");
    };

    const exportCSV = () => {
        let url = "";

        if (type === "sales") {
            url = `${API_URL}/reports/sales/csv?from=${from}&to=${to}&token=${token}`;
        } else if (type === "milk") {
            url = `${API_URL}/reports/milk/csv?from=${from}&to=${to}&token=${token}`;
        } else if (type === "expense") {
            url = `${API_URL}/reports/expense/csv?from=${from}&to=${to}&token=${token}`;
        }
        else {
            url = `${API_URL}/reports/due/csv?token=${token}`;
        }

        window.open(url, "_blank");
    };


    // ================= TABLE COLUMNS =================

    const salesColumns = [
        { header: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
        { header: "Customer", render: (i) => i.user?.name || "N/A", bold: true },
        { header: "Quantity", accessor: "quantity" },
        { header: "Price/L", render: (i) => `₹ ${i.pricePerLiter}` },
        { header: "Total", render: (i) => `₹ ${i.totalPrice}` },
        {
            header: "Status",
            render: (i) =>
                i.paymentStatus === "paid" ? (
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

    const milkColumns = [
        { header: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
        { header: "Animal", render: (i) => i.animal?.tagId || "N/A", bold: true },
        { header: "Morning", accessor: "morningYield" },
        { header: "Evening", accessor: "eveningYield" },
        { header: "Total", accessor: "totalYield" },
    ];

    const dueColumns = [
        { header: "Customer", render: (i) => i.user?.name || "N/A", bold: true },
        { header: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
        { header: "Quantity", accessor: "quantity" },
        { header: "Amount", render: (i) => `₹ ${i.totalPrice}` },
    ];
    const expenseColumns = [
        { header: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
        { header: "Type", accessor: "type" },
        { header: "Title", accessor: "title", bold: true },
        { header: "Amount", render: (i) => `₹ ${i.amount}` },
    ];
    const columns =
        type === "sales"
            ? salesColumns
            : type === "milk"
                ? milkColumns
                : type === "due"
                    ? dueColumns
                    : expenseColumns;

    // ================= UI =================

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <MdAssessment className="text-3xl text-green-700" />
                <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-end mb-6">
                <div>
                    <label className="block text-sm font-medium">Report Type</label>
                    <div className="relative">
                        <MdSummarize className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded px-3 py-2 pl-10"
                        >
                            <option value="sales">Sales Report</option>
                            <option value="milk">Milk Collection Report</option>
                            <option value="due">Due Payment Report</option>
                            <option value="expense">Expense Report</option>
                        </select>

                    </div>
                </div>

                {type !== "due" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">From Date</label>
                            <div className="relative">
                                <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="border rounded px-3 py-2 pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">To Date</label>
                            <div className="relative">
                                <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="border rounded px-3 py-2 pl-10"
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={fetchReport}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded"
                >
                    Generate Report
                </button>

                {/* EXPORT BUTTONS */}
                {data.length > 0 && (
                    <div className="flex gap-2">
                        <button
                            onClick={exportPDF}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            <MdPictureAsPdf />
                            Export PDF
                        </button>

                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            <MdTableChart />
                            Export CSV
                        </button>
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {summary.totalAmount !== undefined && (
                        <div className="bg-green-100 p-4 rounded flex items-center gap-3 font-semibold">
                            <MdCurrencyRupee className="text-2xl text-green-700" />
                            <div>Total Amount: ₹ {summary.totalAmount}</div>
                        </div>
                    )}

                    {summary.totalQuantity !== undefined && (
                        <div className="bg-blue-100 p-4 rounded flex items-center gap-3 font-semibold">
                            <MdLocalDrink className="text-2xl text-blue-700" />
                            <div>Total Quantity: {summary.totalQuantity} L</div>
                        </div>
                    )}

                    {summary.totalMilk !== undefined && (
                        <div className="bg-purple-100 p-4 rounded flex items-center gap-3 font-semibold">
                            <MdLocalDrink className="text-2xl text-purple-700" />
                            <div>Total Milk: {summary.totalMilk} L</div>
                        </div>
                    )}

                    {summary.totalDue !== undefined && (
                        <div className="bg-red-100 p-4 rounded flex items-center gap-3 font-semibold">
                            <MdWarning className="text-2xl text-red-700" />
                            <div>Total Due: ₹ {summary.totalDue}</div>
                        </div>
                    )}
                    {summary.totalExpense !== undefined && (
                        <div className="bg-red-100 p-4 rounded flex items-center gap-3 font-semibold">
                            <MdCurrencyRupee className="text-2xl text-red-700" />
                            <div>Total Expense: ₹ {summary.totalExpense}</div>
                        </div>
                    )}

                </div>
            )}

            {/* Table */}
            <CommonTable
                columns={columns}
                data={data}
                loading={loading}
                emptyMessage="No data found"
            />

            {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
    );
};
