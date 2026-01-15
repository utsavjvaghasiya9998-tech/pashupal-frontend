import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonMilkForm from "../../components/CommonMilkForm";


const API_URL = import.meta.env.VITE_API_URL;

export const AddMilk = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        animal: "",
        date: new Date().toISOString().slice(0, 10),
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

    // 🔹 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.animal) {
            return setError("Please select an animal");
        }

        try {
            setLoading(true);

            const payload = {
                ...form,
                morningYield: Number(form.morningYield || 0),
                eveningYield: Number(form.eveningYield || 0),
                totalYield:
                    Number(form.morningYield || 0) + Number(form.eveningYield || 0),
            };

            await axios.post(`${API_URL}/worker/milk/add`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("payload",payload);
            
             navigate("/milk");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add milk record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonMilkForm
            title="Add Milk Record"
            subtitle="Enter daily milk production"
            animals={animals}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Save Record"
            cancelPath="/milk"
            navigate={navigate}
        />
    );
};
