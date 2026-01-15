import { MdPets } from "react-icons/md";

export const CommonEntityForm = ({
    title,
    form,
    setForm,
    onSubmit,
    loading,
    error,
    submitText,
    navigate,
}) => {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-start">
            <div className="w-full max-w-4xl">
                {/* ===== Card ===== */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    {/* ===== Header ===== */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 flex items-center gap-3">
                        <MdPets className="text-3xl text-white" />
                        <h1 className="text-white text-xl font-semibold">
                            {title}
                        </h1>
                    </div>

                    {/* ===== Form ===== */}
                    <form onSubmit={onSubmit} className="p-6 space-y-6">

                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* ===== Grid ===== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Tag ID */}
                            <div>
                                <label className="block mb-1 font-medium">Tag ID *</label>
                                <input
                                    name="tagId"
                                    required
                                    value={form.tagId || ""}
                                    onChange={handleChange}
                                    placeholder="Enter Tag ID"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            {/* Species */}
                            <div>
                                <label className="block mb-1 font-medium">Species</label>
                                <select
                                    name="species"
                                    value={form.species || "cow"}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="cow">Cow</option>
                                    <option value="buffalo">Buffalo</option>
                                </select>
                            </div>

                            {/* Breed */}
                            <div>
                                <label className="block mb-1 font-medium">Breed</label>
                                <select
                                    name="breed"
                                    value={form.breed || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="">Select</option>
                                    <option value="Gir">Gir</option>
                                    <option value="Murrah">Murrah</option>
                                    <option value="Jafrabadi">Jafrabadi</option>
                                </select>
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block mb-1 font-medium">Age (Years)</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={form.age || ""}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            {/* Health Status */}
                            <div>
                                <label className="block mb-1 font-medium">Health Status</label>
                                <select
                                    name="healthStatus"
                                    value={form.healthStatus || "healthy"}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="healthy">Healthy</option>
                                    <option value="sick">Sick</option>
                                    <option value="recovering">Recovering</option>
                                </select>
                            </div>

                            {/* Current Status */}
                            <div>
                                <label className="block mb-1 font-medium">Current Status</label>
                                <select
                                    name="currentStatus"
                                    value={form.currentStatus || "active"}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                >
                                    <option value="active">Active</option>
                                    <option value="sold">Sold</option>
                                    <option value="dead">Dead</option>
                                </select>
                            </div>

                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block mb-1 font-medium">Notes</label>
                            <textarea
                                name="notes"
                                value={form.notes || ""}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Any additional notes..."
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>

                        {/* ===== Buttons ===== */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/animals")}
                                className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                            >
                                {loading ? "Saving..." : submitText}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

