import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/auth/login`, form);
            const user = res?.data?.user;
            const token = res?.data?.token;
            console.log("token", token);
            console.log("token", res.data);


            const role = res?.data?.role
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("user", JSON.stringify(user));
            if(role==="customer"){
                navigate('/customer-history')
            }else{
                navigate("/");
            }

        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

                {/* ================= LEFT SIDE IMAGE ================= */}
                <div className="hidden md:block">
                    <img
                        src="../../../public/buffalo2.webp"
                        alt="Farming"
                        className="w-full h-full object-center"
                    />
                </div>

                {/* ================= RIGHT SIDE FORM ================= */}
                <div className="p-8 md:p-10 flex items-center justify-center">
                    <div className="w-full max-w-md">

                        {/* Title */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-green-700">PashuPal Login</h1>
                            <p className="text-gray-500 text-sm">Login to your dashboard</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="********"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold transition"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="text-center text-xs text-gray-500 mt-6">
                            © {new Date().getFullYear()} PashuPal
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
