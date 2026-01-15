import { useEffect, useState } from "react";
import axios from "axios";
import { MdLocalDrink, MdCurrencyRupee, MdHistory, MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

const UserDashboard = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [stats, setStats] = useState({
        totalMilk: 0,
        totalAmount: 0,
        unpaidAmount: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_URL}/user/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setStats({
                    totalMilk: res.data.totalMilk || 0,
                    totalAmount: res.data.totalAmount || 0,
                    unpaidAmount: res.data.unpaidAmount || 0,
                });
            } catch (err) {
                console.error("USER DASHBOARD ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [API_URL, token]);

   if (loading) {
    return <Loader text="Loading animal details..." />;
}

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto select-none">

            {/* 👤 Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-xl shadow mb-6">
                <div className="flex items-center gap-3">
                    <MdPerson className="text-3xl" />
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                        <p className="text-green-100 text-sm">
                            Here is your milk account summary
                        </p>
                    </div>
                </div>
            </div>

            {/* 📊 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Total Milk */}
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 text-green-700 text-3xl">
                        <MdLocalDrink />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Milk Taken</p>
                        <p className="text-2xl font-bold">{stats.totalMilk} L</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-700 text-3xl">
                        <MdCurrencyRupee />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Amount</p>
                        <p className="text-2xl font-bold">₹ {stats.totalAmount}</p>
                    </div>
                </div>

                {/* Unpaid */}
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-100 text-red-700 text-3xl">
                        <MdCurrencyRupee />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Pending Amount</p>
                        <p className="text-2xl font-bold">₹ {stats.unpaidAmount}</p>
                    </div>
                </div>

            </div>

            {/* 🔘 Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <NavLink
                    to="/customer-history"
                    className="bg-white hover:bg-green-50 transition border rounded-xl shadow p-6 flex items-center gap-4 cursor-pointer"
                >
                    <div className="text-3xl text-green-700">
                        <MdHistory />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Milk History</h3>
                        <p className="text-sm text-gray-500">
                            View your daily milk records
                        </p>
                    </div>
                </NavLink>

                <NavLink
                    to="/user/payments"
                    className="bg-white hover:bg-green-50 transition border rounded-xl shadow p-6 flex items-center gap-4 cursor-pointer"
                >
                    <div className="text-3xl text-green-700">
                        <MdCurrencyRupee />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Payment History</h3>
                        <p className="text-sm text-gray-500">
                            View your payment records
                        </p>
                    </div>
                </NavLink>

            </div>

        </div>
    );
};

export default UserDashboard;
