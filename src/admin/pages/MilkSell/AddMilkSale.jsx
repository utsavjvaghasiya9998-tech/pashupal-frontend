import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonMilkSaleForm from "../../components/CommonMilkSaleForm";

const API_URL = import.meta.env.VITE_API_URL;

export const AddMilkSale = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        user: "",
        date: new Date().toISOString().slice(0, 10),
        morningYield: "",
        eveningYield: "",
        pricePerLiter: 70,
        paymentStatus: "unpaid",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${API_URL}/user/all?limit=1000`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data.data || []);
        };
        fetchUsers();
    }, [API_URL, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const morning = Number(form.morningYield || 0);
            const evening = Number(form.eveningYield || 0);
            const quantity = morning + evening;

            await axios.post(
                `${API_URL}/milk-sell/add`,
                {
                    ...form,
                    morningYield: morning,
                    eveningYield: evening,
                    quantity,
                    totalPrice: quantity * Number(form.pricePerLiter),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate("/milk-sell");
        } catch (err) {
            setError("Failed to add milk sale");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonMilkSaleForm
            title="Milk Sale"
            subtitle="Give milk to customer"
            users={users}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Save Sale"
            cancelPath="/milk-sell"
            navigate={navigate}
        />
    );
};
