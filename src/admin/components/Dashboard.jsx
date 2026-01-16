import { useEffect, useState } from "react";
import axios from "axios";
import {
    MdPets,
    MdPeople,
    MdLocalDrink,
    MdBarChart,
    MdAdd,
    MdCurrencyRupee,
    MdAttachMoney
} from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
    const [stats, setStats] = useState({
        animals: 0,
        workers: 0,
        totalStockMilk: 0,
        totalMilk: 0,
        totalExpense: 0,
        totalIncome: 0,
        recentMilk: [],
    });
    const role = localStorage.getItem('role');
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {

                const res = await axios.get(`${API_URL}/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // console.log("res", res.data);
                setStats({
                    animals: res?.data?.totalAnimals,
                    workers: res?.data?.totalWorkers,
                    totalStockMilk: res?.data?.totalStockMilk,
                    totalMilk: res?.data?.totalMilk,
                    totalExpense: res?.data?.totalExpense,
                    totalIncome: res?.data?.totalIncome,
                    recentMilk: res?.data?.recentMilk || [],
                });

            } catch (err) {
                console.error("DASHBOARD ERROR:", err);
            }
        };

        fetchDashboard();
    }, [API_URL, token]);

    return (
        <div className="p-4 md:p-6 space-y-6">

            {(role === "admin" || role === "worker") && (<>
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500 text-sm">Farm overview & statistics</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ju">
                    <StatCard title="Total Animals" value={stats.animals} icon={<MdPets />} color="green" />
                    {role === "admin" && (
                        <StatCard title="Workers" value={stats.workers} icon={<MdPeople />} color="blue" />
                    )}
                    <StatCard title="Total Stock Milk (L)" value={stats.totalStockMilk} icon={<MdLocalDrink />} color="purple" />
                    <StatCard title="Total  Milk (L)" value={stats.totalMilk} icon={<MdLocalDrink />} color="purple" />
                    {role === "admin" && (<StatCard title="Total Expense" value={stats.totalExpense} icon={<MdCurrencyRupee />} color="yellow" />)}
                    {role === "admin" && (
                        <StatCard title="Total Income (₹)" value={stats.totalIncome} icon={<MdCurrencyRupee />} color="green" />
                    )}
                </div>

            </>
            )}
        </div>
    );
};

/* ===== Small Card Component ===== */
const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        green: "bg-green-100 text-green-700",
        blue: "bg-blue-100 text-blue-700",
        yellow: "bg-yellow-100 text-yellow-700",
        purple: "bg-purple-100 text-purple-700",
    };

    return (
        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>

            <div className={`p-3 rounded-full text-3xl ${colors[color]}`}>
                {icon}
            </div>
        </div>
    );
};
