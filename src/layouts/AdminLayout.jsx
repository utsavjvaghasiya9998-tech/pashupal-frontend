import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header } from "../admin/components/Header";
import { Sidebar } from "../admin/components/Sidebar";
import { Footer } from "../components/Footer";

export const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header onMenuClick={() => setIsOpen(true)} />

            <div className="flex pt-16">
                {/* Sidebar */}
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto md:ml-64">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
