import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommonWorkerForm from "../../components/CommonWorkerForm";

const API_URL = import.meta.env.VITE_API_URL;

export const EditWorker = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "", // optional
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Fetch worker data
    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const res = await axios.get(`${API_URL}/worker/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const w = res.data.data;

                setForm({
                    name: w.name || "",
                    email: w.email || "",
                    phone: w.phone || "",
                    address: w.address || "",
                    password: "", // don't prefill password
                });
            } catch (err) {
                console.error("FETCH WORKER ERROR:", err);
                setError("Failed to load worker");
            } finally {
                setLoading(false);
            }
        };

        fetchWorker();
    }, [API_URL, id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSaving(true);

            // If password empty, don't send it
            const payload = { ...form };
            if (!payload.password) delete payload.password;

            await axios.put(`${API_URL}/worker/edit/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/admin/workers");
        } catch (err) {
            console.error("UPDATE WORKER ERROR:", err);
            setError(err.response?.data?.message || "Failed to update worker");
        } finally {
            setSaving(false);
        }
    };

    // ⏳ Loader
    if (loading) {
        return (
            <div className="p-6 flex justify-center">
                <div className="text-lg font-semibold animate-pulse">
                    Loading worker...
                </div>
            </div>
        );
    }

    // ❌ Error
    if (error) {
        return <div className="p-6 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <CommonWorkerForm
            title="Edit Worker"
            subtitle="Update worker details"
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={saving}
            error={error}
            success=""
            submitText="Update Worker"
            cancelPath="/admin/workers"
            navigate={navigate}
            showPassword={true}   // show password field but optional
        />
    );
};
