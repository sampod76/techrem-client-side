import { createBrowserRouter } from "react-router-dom";
import MassageDetails from "../component/MassageDetails";
import Main from "../Layout/Main";
import AddToCart from "../Pages/AddToCard/AddToCart";
import Login from "../Pages/authentication/Login";
import Register from "../Pages/authentication/Register";
import CreateEmployee from "../Pages/Dashboard/Admin/CreateEmployee/CreateEmployee";
import OrderHistory from "../Pages/Dashboard/Admin/OrderHistory/OrderHistory";
import ServiceReview from "../Pages/Dashboard/Admin/ServiceReview/ServiceReview";
import ErrorPage from "../Pages/shared/ErrorPage";
import CashManagement from "../Pages/Dashboard/Admin/CashManagement/CashManagement";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/Admin/AllUser/AllUsers";
import ActivityLog from "../Pages/Dashboard/Admin/ActivityLog/ActivityLog";
import AddNewService from "../Pages/Dashboard/ForAuthorities/AddNewService/AddNewService";
import AllServices from "../Pages/Dashboard/ForAuthorities/AllServices/AllServices";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UpdateService from "../Pages/Dashboard/ForAuthorities/AddNewService/UpdateService";
import BookingHistory from "../Pages/Dashboard/ForAuthorities/BookingHistory/BookingHistory";
import OfflineOrderMake from "../Pages/Dashboard/ForAuthorities/OffLineBookingMake/OfflineOrderMake";
import OfflineBookingForm from "../Pages/Dashboard/ForAuthorities/OffLineBookingMake/OfflineBookingForm";
import ServiceDetails from "../Pages/Dashboard/ForAuthorities/AllServices/ServiceDetails";
import Home from "../Pages/HomePage/Home/Home";
import UpdateProfile from "../Pages/Dashboard/UserDashboard/UpdateProfile";
import BookingDetails from "../Pages/Dashboard/ForAuthorities/BookingHistory/BookingDetails";
import OrderCreateForm from "../Pages/OrderFroms/OrderCreateForm";
import OrderConfirmForm from "../Pages/OrderFroms/OrderConfirmForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "add-to-cart",
                element: <AddToCart />
            },
            {
                path: "massages/:id",
                element: <MassageDetails />
            },
            {
                path: "create-order/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_DEV_URL}/services/single-service/${params.id}`, {  headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                } }),
                element: <OrderCreateForm />,
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/dashboard/update-ac/:email",
                element: <UpdateProfile />
            },
            {
                path: "/dashboard/create-employee",
                element: <CreateEmployee />
            },
            {
                path: "/dashboard/activity-log/:id",
                element: <ActivityLog />
            },
            {
                path: "/dashboard/order-history",
                element: <OrderHistory />
            },
            {
                path: "/dashboard/booking-history",
                element: <BookingHistory />
            },
            {
                path: "/dashboard/service-review",
                element: <ServiceReview />
            },
            {
                path: "/dashboard/add-new-service",
                element: <AddNewService />
            },
            {
                path: "/dashboard/update-service/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_DEV_URL}/services/single-service/${params.id}`, {  headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                } }),
                element: <UpdateService />
            },
            {
                path: "/dashboard/all-user",
                element: <AllUsers />
            },
            {
                path: "/dashboard/offline-order-make",
                element: <OfflineOrderMake />
            },
            {
                path: "/dashboard/order-confirm-form/:bookingId",
                element: <OrderConfirmForm />
            },
            {
                path: "/dashboard/offline-booking-form/:id",
                element: <OfflineBookingForm />
            },
            {
                path: "/dashboard/booking-details/:id",
                element: <BookingDetails/>
            },
            {
                path: "/dashboard/all-service",
                element: <AllServices />
            },
            {
                path: "/dashboard/service/:id",
                element: <ServiceDetails />
            },
            {
                path: "/dashboard/cash-management",
                element: <CashManagement />
            },
            {
                path: "/dashboard/userDetails/:email",
                element: <UpdateProfile />,

            },
        ]
    }
])