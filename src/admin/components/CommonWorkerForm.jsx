import { MdPerson, MdEmail, MdPhone, MdHome, MdLock } from "react-icons/md";

const CommonWorkerForm = ({
    title,
    subtitle,
    form,
    setForm,
    onSubmit,
    loading,
    error,
    success,
    submitText,
    cancelPath,
    navigate,
    showPassword = true,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header Card */}
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

                {/* Success */}
                {success && (
                    <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
                        {success}
                    </div>
                )}

                {/* Form Card */}
                <form
                    onSubmit={onSubmit}
                    className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Full Name</label>
                            <div className="relative mt-1">
                                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <div className="relative mt-1">
                                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Phone</label>
                            <div className="relative mt-1">
                                <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Address</label>
                            <div className="relative mt-1">
                                <MdHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Password (only in Add) */}
                        {showPassword && (
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">Password</label>
                                <div className="relative mt-1">
                                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password || ""}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-8">
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

export default CommonWorkerForm;
