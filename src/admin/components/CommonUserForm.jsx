import {
    MdPerson,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdLock,
    MdSave,
    MdArrowBack,
} from "react-icons/md";

const CommonUserForm = ({
    title,
    subtitle,
    form,
    setForm,
    onSubmit,
    loading,
    error,
    submitText,
    cancelPath,
    navigate,
    showPassword = true,
}) => {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 flex items-center gap-2">
                    <MdPerson className="text-2xl" />
                    <div>
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-sm text-green-100">{subtitle}</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="p-6 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <div className="relative">
                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Password (only in Add) */}
                    {showPassword && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Password *
                            </label>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password || ""}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Phone
                        </label>
                        <div className="relative">
                            <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Address
                        </label>
                        <div className="relative">
                            <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
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

export default CommonUserForm;
