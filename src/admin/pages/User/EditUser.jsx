import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommonUserForm from "../../components/CommonUserForm";

const API_URL = import.meta.env.VITE_API_URL;

export const EditUser = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API_URL}/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data.data || res.data.Data; // backend inconsistency safe

                setForm({
                    name: data?.name || "",
                    email: data?.email || "",
                    phone: data?.phone || "",
                    address: data?.address || "",
                });
            } catch (err) {
                console.error("FETCH USER ERROR:", err);
                setError("Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [API_URL, id, token]);

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await axios.put(`${API_URL}/user/edit/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/customer");
        } catch (err) {
            console.error("UPDATE USER ERROR:", err);
            setError(err.response?.data?.message || "Failed to update user");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading customer...</div>;
    }

    if (error && !saving) {
        return <div className="p-6 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <CommonUserForm
            title="Edit Customer"
            subtitle="Edit milk customer details"
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={saving}
            error={error}
            submitText="Update Customer"
            cancelPath="/customer"
            navigate={navigate}
            showPassword={false}   // 👈 hide password in edit
        />
    );
};
