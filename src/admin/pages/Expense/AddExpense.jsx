import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MdAttachMoney,
    MdTitle,
    MdDateRange,
    MdPets,
    MdNotes,
    MdSave,
    MdCategory,
} from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

export const AddExpense = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        type: "feed",
        animal: "",
        title: "",
        amount: "",
        date: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await axios.post(`${API_URL}/expense/add`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/expenses");
        } catch (err) {
            console.error("ADD EXPENSE ERROR:", err);
            setError(err.response?.data?.message || "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-xl shadow mb-6">
                    <h1 className="text-2xl font-bold">Add Expense</h1>
                    <p className="text-green-100 text-sm">Add farm expense details</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Expense Type */}
                        <Select label="Expense Type" name="type" value={form.type} onChange={handleChange}>
                            <option value="feed">Feed (Chara)</option>
                            <option value="medicine">Medicine</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="other">Other</option>
                        </Select>


                        {/* Title */}
                        <Input label="Title" icon={<MdTitle />} name="title" value={form.title} onChange={handleChange} required />

                        {/* Amount */}
                        <Input label="Amount (₹)" icon={<MdAttachMoney />} name="amount" type="number" value={form.amount} onChange={handleChange} required />

                        {/* Date */}
                        <Input label="Date" icon={<MdDateRange />} name="date" type="date" value={form.date} onChange={handleChange} />

                        {/* Notes */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">Notes</label>
                            <div className="relative mt-1">
                                <MdNotes className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/expenses")}
                            className="px-6 py-2 rounded-lg border hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow flex items-center gap-2"
                        >
                            <MdSave />
                            {loading ? "Saving..." : "Save Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ===== Reusable Components ===== */

const Input = ({ label, icon, ...props }) => (
    <div>
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                {icon}
            </span>
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
        </div>
    </div>
);

const Select = ({ label, children, ...props }) => (
    <div>
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <select
            {...props}
            className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
        >
            {children}
        </select>
    </div>
);
