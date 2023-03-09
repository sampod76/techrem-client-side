import React from 'react';
import CategoryAddExtraForm from '../../component/form/CategoryAddExtraForm';
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard';
import UserDashboard from './UserDashboard/UserDashboard';
import UseRewordPage from './UserDashboard/UserRewordPage';

const Dashboard = () => {
    
    return (
        <div className='w-full'>
            <UserDashboard></UserDashboard>
            {/* <AdminDashboard></AdminDashboard> */}
            {/* <CategoryAddExtraForm></CategoryAddExtraForm> */}
            {/* <UseRewordPage></UseRewordPage> */}
        </div>
    );
};

export default Dashboard;