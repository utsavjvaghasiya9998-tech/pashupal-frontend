import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { CommonEntityForm } from "../../components/CommonEntityForm";



const API_URL = import.meta.env.VITE_API_URL;

export const AddAnimal = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        tagId: "",
        species: "cow",
        breed: "",
        age: "",
        healthStatus: "healthy",
        currentStatus: "active",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post(`${API_URL}/animals/add`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/admin/animals");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to add animal");
        } finally {
            setLoading(false);
        }
    };
    const animalFields = [
        {
            name: "tagId",
            label: "Tag ID *",
            required: true,
            placeholder: "Enter Tag ID",
        },
        {
            name: "species",
            label: "Species",
            type: "select",
            options: [
                { label: "Cow", value: "cow" },
                { label: "Buffalo", value: "buffalo" },
            ],
        },
        {
            name: "breed",
            label: "Breed",
            type: "select",
            options: [
                { label: "Select", value: "" },
                { label: "Gir", value: "Gir" },
                { label: "Murrah", value: "Murrah" },
                { label: "Jafrabadi", value: "Jafrabadi" },
            ],
        },
        {
            name: "age",
            label: "Age (Years)",
            type: "number",
        },
        {
            name: "healthStatus",
            label: "Health Status",
            type: "select",
            options: [
                { label: "Healthy", value: "healthy" },
                { label: "Sick", value: "sick" },
                { label: "Recovering", value: "recovering" },
            ],
        },
        {
            name: "currentStatus",
            label: "Current Status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Sold", value: "sold" },
                { label: "Dead", value: "dead" },
            ],
        },
        {
            name: "notes",
            label: "Notes",
            type: "textarea",
        },
    ];

    return (
        <CommonEntityForm
            title="Add New Animal"
            icon={<MdPets className="text-3xl text-white" />}
            fields={animalFields}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Save Animal"
            cancelPath="/admin/animals"
            navigate={navigate}
        />
    );
};
