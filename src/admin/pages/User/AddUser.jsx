import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonUserForm from "../../components/CommonUserForm";

const API_URL = import.meta.env.VITE_API_URL;

export const AddUser = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post(`${API_URL}/user/add`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/customer");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonUserForm
            title="Add Customer"
            subtitle="Create new milk customer account"
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Add Customer"
            cancelPath="/customer"
            navigate={navigate}
            showPassword={true}
        />
    );
};
