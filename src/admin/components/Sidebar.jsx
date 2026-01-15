import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdPets,
    MdLocalDrink,
    MdPeople,
    MdClose,
    MdShoppingCart,
    MdAssessment,
    MdAttachMoney,
} from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";

import { LuUsersRound } from "react-icons/lu";

export const Sidebar = ({ isOpen, setIsOpen }) => {
    const linkClass = ({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${isActive
            ? "bg-white text-green-700 shadow-md"
            : "text-green-100 hover:bg-green-600 hover:text-white"
        }`;

    const role = localStorage.getItem("role");

    return (
        <>
            {/* Overlay (mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
  fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-green-800 text-white p-4 z-50 overflow-y-auto
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0
`}

            >
                {/* Close (mobile only) */}
                <div className="flex justify-end mb-4 md:hidden">
                    <button onClick={() => setIsOpen(false)}>
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="space-y-2">
                    {(role === "admin" || role === "worker") && (
                        <NavLink to="/admin" end className={linkClass} onClick={() => setIsOpen(false)}>
                            <MdDashboard className="text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    )}

                    {role === "admin" && (
                        <NavLink to="/admin/animals" className={linkClass} onClick={() => setIsOpen(false)}>
                            <MdPets className="text-xl" />
                            <span>Animals</span>
                        </NavLink>
                    )}
                    {role === "admin" && (
                        <NavLink
                            to="/admin/reports"
                            className={linkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <MdAssessment className="text-xl" />
                            <span>Reports</span>
                        </NavLink>

                    )}
                    {(role === "admin" || role === "worker") && (
                        <NavLink to="/admin/milk" className={linkClass} onClick={() => setIsOpen(false)}>
                            <MdLocalDrink className="text-xl" />
                            <span>Milk Records</span>
                        </NavLink>
                    )}
                    {role === "admin" && (
                        <NavLink to="/admin/workers" className={linkClass} onClick={() => setIsOpen(false)}>
                            <MdPeople className="text-xl" />
                            <span>Workers</span>
                        </NavLink>
                    )}

                    {role === "admin" && (
                        <NavLink to="/admin/customer" className={linkClass} onClick={() => setIsOpen(false)}>
                            <LuUsersRound className="text-xl" />
                            <span>Customer</span>
                        </NavLink>
                    )}
                    {(role === "admin" || role === "worker") && (
                        <NavLink to="/admin/milk-sell" className={linkClass}>
                            <MdShoppingCart className="text-xl" />
                            <span>Milk Sales</span>
                        </NavLink>
                    )}
                    {role === "customer" && (
                        <NavLink
                            to={`/admin/customer-dashboard`}
                            className={linkClass}
                        >
                            <MdDashboard className="text-xl" />
                            Dashboard
                        </NavLink>
                    )}

                    {role === "customer" && (
                        <NavLink
                            to={`/admin/user/payments`}
                            className={linkClass}
                        >
                            <AiOutlineHistory className="text-xl" />
                            user/payments
                        </NavLink>
                    )}
                    {role === "customer" && (
                        <NavLink
                            to={`/admin/customer-history`}
                            className={linkClass}
                        >
                            <AiOutlineHistory className="text-xl" />
                            History
                        </NavLink>
                    )}
                    {role === "admin" && (
                        <NavLink
                            to="/admin/expenses"
                            className={linkClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <MdAttachMoney className="text-xl" />
                            <span>Expenses</span>
                        </NavLink>
                    )}

                </nav>
            </aside>
        </>
    );
};
