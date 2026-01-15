import {
    MdPerson,
    MdLocalDrink,
    MdCurrencyRupee,
    MdSave,
    MdArrowBack,
    MdCalendarToday,
} from "react-icons/md";

const CommonMilkSaleForm = ({
    title,
    subtitle,
    users,
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
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const morning = Number(form.morningYield || 0);
    const evening = Number(form.eveningYield || 0);
    const quantity = morning + evening;
    const totalPrice = quantity * Number(form.pricePerLiter || 0);

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 flex items-center gap-2">
                    <MdLocalDrink className="text-2xl" />
                    <div>
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-sm text-green-100">{subtitle}</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="p-6 space-y-5">
                    {/* Customer */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Customer *
                        </label>
                        <div className="relative">
                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <select
                                name="user"
                                value={form.user}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            >
                                <option value="">Select customer</option>
                                {users.map((u) => (
                                    <option key={u._id} value={u._id}>
                                        {u.name} {u.phone ? `(${u.phone})` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Date
                        </label>
                        <div className="relative">
                            <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Morning & Evening */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["morningYield", "eveningYield"].map((field, i) => (
                            <div key={field}>
                                <label className="text-sm font-medium text-gray-600">
                                    {i === 0 ? "Morning Milk (L)" : "Evening Milk (L)"}
                                </label>
                                <div className="relative mt-1">
                                    <MdLocalDrink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="number"
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quantity */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 font-semibold">
                        Total Quantity: {quantity} Liters
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Price per Liter *
                        </label>
                        <div className="relative">
                            <MdCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="number"
                                name="pricePerLiter"
                                value={form.pricePerLiter}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 font-semibold">
                        Total Amount: ₹ {totalPrice}
                    </div>

                    {/* Payment Status */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Payment Status
                        </label>
                        <select
                            name="paymentStatus"
                            value={form.paymentStatus}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>

                    {/* Error */}
                    {error && <div className="text-red-600 font-semibold">{error}</div>}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(cancelPath)}
                            className="px-5 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-2"
                        >
                            <MdArrowBack /> Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
                        >
                            <MdSave />
                            {loading ? "Saving..." : submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommonMilkSaleForm;
