import { MdOutlineMenuOpen } from "react-icons/md";
import { NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
export const Header = ({onMenuClick}) => {

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.clear();
        window.location.href = "/login";
    };


    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <header className="h-16  bg-[#022C22] text-white flex items-center justify-between px-6 shadow-md fixed top-0 left-0 right-0 z-50">
            {/* Left side */}
            <div className="flex items-center gap-3">

                <button
                    onClick={onMenuClick}
                    className="md:hidden text-white text-3xl focus:outline-none"
                >
                    <MdOutlineMenuOpen />
                </button>

                {/* Logo / Title */}
                <NavLink to='/' className="text-xl cursor-pointer font-bold tracking-wide">
                    PashuPal
                </NavLink>
            </div>


            <div className="flex items-center gap-4">
                {/* ✅ Show user name */}
                <span className="text-sm font-medium">
                    {user?.name || "User"}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};
