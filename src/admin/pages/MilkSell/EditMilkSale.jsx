import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommonMilkSaleForm from "../../components/CommonMilkSaleForm";

const API_URL = import.meta.env.VITE_API_URL;

export const EditMilkSale = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        user: "",
        date: "",
        morningYield: "",
        eveningYield: "",
        pricePerLiter: "",
        paymentStatus: "paid",
    });

    // 🔹 Load users + sale
    useEffect(() => {
        const loadData = async () => {
            try {
                const [usersRes, saleRes] = await Promise.all([
                    axios.get(`${API_URL}/user/all?limit=1000`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${API_URL}/milk-sell/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUsers(usersRes.data.data || []);

                const sale = saleRes.data.data;

                setForm({
                    user: sale.user?._id || sale.user || "",
                    date: sale.date ? sale.date.substring(0, 10) : "",
                    morningYield: sale.morningYield || "",
                    eveningYield: sale.eveningYield || "",
                    pricePerLiter: sale.pricePerLiter || "",
                    paymentStatus: sale.paymentStatus || "paid",
                });
            } catch (err) {
                console.error("LOAD SALE ERROR:", err);
                setError("Failed to load sale data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [API_URL, token, id]);

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const morning = Number(form.morningYield || 0);
            const evening = Number(form.eveningYield || 0);
            const quantity = morning + evening;

            await axios.put(
                `${API_URL}/milk-sell/edit/${id}`,
                {
                    ...form,
                    morningYield: morning,
                    eveningYield: evening,
                    quantity,
                    totalPrice: quantity * Number(form.pricePerLiter || 0),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            navigate("/milk-sell");
        } catch (err) {
            console.error("UPDATE SALE ERROR:", err);
            setError(err.response?.data?.message || "Failed to update sale");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading sale...</div>;
    }

    if (error && !saving) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    return (
        <CommonMilkSaleForm
            title="Edit Milk Sale"
            subtitle="Update customer milk sale"
            users={users}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={saving}
            error={error}
            submitText="Update Sale"
            cancelPath="/milk-sell"
            navigate={navigate}
        />
    );
};
