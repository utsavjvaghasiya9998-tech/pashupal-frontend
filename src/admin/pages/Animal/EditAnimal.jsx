import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CommonEntityForm } from "../../components/CommonEntityForm";
import Loader from "../../components/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export const EditAnimal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Load animal data
    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const res = await axios.get(`${API_URL}/animals/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm(res.data.data);
            } catch (err) {
                setError("Failed to load animal data");
            } finally {
                setPageLoading(false);
            }
        };

        fetchAnimal();
    }, [API_URL, id, token]);

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.put(`${API_URL}/animals/edit/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/animals");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update animal");
        } finally {
            setLoading(false);
        }
    };

    // ⏳ Loading state
    if (pageLoading) {
        return <Loader text="Loading animal details..." />;
    }

    // ❌ Error state
    if (!form) {
        return (
            <div className="p-6 text-red-600">
                Failed to load animal data.
            </div>
        );
    }

    // ✅ Use SAME UI as AddAnimal
    return (
        <CommonEntityForm
            title="Edit Animal"
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Update Animal"
            navigate={navigate}
        />
    );
};
