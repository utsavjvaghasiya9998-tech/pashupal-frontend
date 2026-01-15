import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonWorkerForm from "../../components/CommonWorkerForm";

const API_URL = import.meta.env.VITE_API_URL;

export const AddWorker = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);

            await axios.post(`${API_URL}/worker/add`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess("Worker added successfully!");

            setTimeout(() => {
                navigate("/admin/workers");
            }, 800);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add worker");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonWorkerForm
            title="Add New Worker"
            subtitle="Create and manage worker account"
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            submitText="Save Worker"
            cancelPath="/admin/workers"
            navigate={navigate}
            showPassword={true}
        />
    );
};
