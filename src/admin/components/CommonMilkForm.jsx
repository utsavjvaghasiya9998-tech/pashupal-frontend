import { MdPets, MdDateRange, MdLocalDrink, MdNotes } from "react-icons/md";

const CommonMilkForm = ({
    title,
    subtitle,
    animals,
    form,
    setForm,
    onSubmit,
    loading,
    error,
    navigate,
    submitText,
    cancelPath,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-xl shadow mb-6">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-green-100 text-sm">{subtitle}</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="bg-white rounded-xl shadow-lg p-6 space-y-5"
                >
                    {/* Animal */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Animal</label>
                        <div className="relative mt-1">
                            <MdPets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <select
                                name="animal"
                                value={form.animal}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Animal</option>
                                {animals.map((a) => (
                                    <option key={a._id} value={a._id}>
                                        {a.tagId} ({a.species})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Date</label>
                        <div className="relative mt-1">
                            <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Morning & Evening */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Morning Milk (L)
                            </label>
                            <div className="relative mt-1">
                                <MdLocalDrink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="morningYield"
                                    value={form.morningYield}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Evening Milk (L)
                            </label>
                            <div className="relative mt-1">
                                <MdLocalDrink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="eveningYield"
                                    value={form.eveningYield}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Remarks</label>
                        <div className="relative mt-1">
                            <MdNotes className="absolute left-3 top-3 text-gray-400 text-xl" />
                            <textarea
                                name="remarks"
                                value={form.remarks}
                                onChange={handleChange}
                                rows="3"
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="Optional notes..."
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(cancelPath)}
                            className="px-6 py-2 rounded-lg border hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow"
                        >
                            {loading ? "Saving..." : submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommonMilkForm;
