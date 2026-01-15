import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
    return (<>
        <Header />
        <Sidebar />
        <Outlet />
        <Footer />  
    </>);
}