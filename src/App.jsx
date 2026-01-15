import { Route, Routes, Navigate } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import Login from "./admin/components/Login";
import PublicRoute from "./admin/routes/PublicRoute";
import AdminProtectedRoute from "./admin/routes/AdminProtectedRoute";
import { Workers } from "./admin/pages/Worker/WorkerList";
import { Milk } from "./admin/pages/Milk/MilkList";
import { Animal } from "./admin/pages/Animal/AnimalList";
import { AddWorker } from "./admin/pages/Worker/AddWorker";
import { EditWorker } from "./admin/pages/Worker/EditWorker";
import { AddMilk } from "./admin/pages/Milk/AddMilk";
import { EditMilk } from "./admin/pages/Milk/EditMilk";
import { AddAnimal } from "./admin/pages/Animal/AddAnimal";
import { EditAnimal } from "./admin/pages/Animal/EditAnimal";
import { Dashboard } from "./admin/components/Dashboard";
import { MainLayout } from "./layouts/MainLayout";
import { Users } from "./admin/pages/User/UserList";
import { AddUser } from "./admin/pages/User/AddUser";
import { EditUser } from "./admin/pages/User/EditUser";

import { AddMilkSale } from "./admin/pages/MilkSell/AddMilkSale";
import { EditMilkSale } from "./admin/pages/MilkSell/EditMilkSale";
import { MilkSell } from "./admin/pages/MilkSell/SellMilkList";
import { CustomerMilkHistory } from "./admin/pages/customer/CustomerMilkHistory";
import UserDashboard from "./admin/components/UserDashboard";
import UserPayments from "./admin/components/Payments";
import { Reports } from "./admin/pages/Reports";
import { Expenses } from "./admin/pages/Expense/Expense";
import { AddExpense } from "./admin/pages/Expense/AddExpense";



// Admin Pages


function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<MainLayout />} /> */}
            {/* ================= PUBLIC ROUTES ================= */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* ================= PROTECTED ADMIN ROUTES ================= */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="workers" element={<Workers />} />
                    <Route path="worker/add" element={<AddWorker />} />
                    <Route path="worker/edit/:id" element={<EditWorker />} />
                    <Route path="milk" element={<Milk />} />
                    <Route path="milk/add" element={<AddMilk />} />
                    <Route path="milk/edit/:id" element={<EditMilk />} />
                    <Route path="animals" element={<Animal />} />
                    <Route path="animals/add" element={<AddAnimal />} />
                    <Route path="animals/edit/:id" element={<EditAnimal />} />
                    <Route path='customer' element={<Users />} />
                    <Route path='customer/edit/:id' element={<EditUser />} />
                    <Route path='customer/add' element={<AddUser />} />
                    <Route path='milk-sell' element={<MilkSell />} />
                    <Route path='milk-sell/add' element={<AddMilkSale />} />
                    <Route path='milk-sell/edit/:id' element={<EditMilkSale />} />
                    <Route path="customer-dashboard" element={<UserDashboard />} />
                    <Route path="user/payments" element={<UserPayments />} />
                    <Route path="reports" element={<Reports />} />
                    <Route
                        path="/admin/customer-history"
                        element={<CustomerMilkHistory />}
                    />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="expense/add" element={<AddExpense />} />

                </Route>
            </Route>
        </Routes>
    );
}

export default App;
