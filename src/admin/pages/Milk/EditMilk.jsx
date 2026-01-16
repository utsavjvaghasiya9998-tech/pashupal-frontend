import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommonMilkForm from "../../components/CommonMilkForm";

const API_URL = import.meta.env.VITE_API_URL;

export const EditMilk = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        animal: "",
        date: "",
        morningYield: "",
        eveningYield: "",
        remarks: "",
    });

    // 🔹 Fetch animals
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await axios.get(`${API_URL}/animals/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAnimals(res.data.data || []);
            } catch (err) {
                console.error("FETCH ANIMALS ERROR:", err);
            }
        };

        fetchAnimals();
    }, [API_URL, token]);

    // 🔹 Fetch milk record
    useEffect(() => {
        const fetchMilk = async () => {
            try {
                const res = await axios.get(`${API_URL}/worker/milk/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const m = res.data.data;

                setForm({
                    animal: m.animal?._id || m.animal,
                    date: new Date(m.date).toISOString().slice(0, 10),
                    morningYield: m.morningYield || "",
                    eveningYield: m.eveningYield || "",
                    remarks: m.remarks || "",
                });
            } catch (err) {
                setError("Failed to load milk record");
            } finally {
                setLoading(false);
            }
        };

        fetchMilk();
    }, [API_URL, id, token]);

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSaving(true);

            const payload = {
                ...form,
                morningYield: Number(form.morningYield || 0),
                eveningYield: Number(form.eveningYield || 0),
                totalYield:
                    Number(form.morningYield || 0) + Number(form.eveningYield || 0),
            };

            await axios.put(`${API_URL}/worker/milk/edit/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/milk");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update record");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center">
                <div className="text-lg font-semibold animate-pulse">
                    Loading milk record...
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <CommonMilkForm
            title="Edit Milk Record"
            subtitle="Update daily milk production"
            animals={animals}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={saving}
            error={error}
            submitText="Update Record"
            cancelPath="/milk"
            navigate={navigate}
        />
    );
};
