import React from 'react';
import { useState } from 'react';
import CustomerCreateForm from '../../../../component/form/CustomerCreateForm';
import EmployeeCreateForm from '../../../../component/form/EmployeeCreateForm';

const CreateEmployee = () => {
    const [employeeType, setEmployeeType] = useState("user");
    
    return (
        <div className='mx-auto py-4'>
            <h2 className='text-2xl font-bold text text-center mb-4'>Create New Employee Account</h2>
            <main className='w-full md:w-[600px] border mx-auto'>
                <nav className='flex justify-center mt-4'>
                    <li className='list-none'><button onClick={(e) => setEmployeeType(e.target.value)} value="manager" className={`min-w-[100px] font-semibold border px-3 py-2 whitespace-pre ${employeeType === "manager" ? "bg-blue-600 text-white" : "bg-red-400"}`}>Manager</button></li>
                    {/* <li className='list-none'><button onClick={(e) => setEmployeeType(e.target.value)} value="POS Staff" className={`font-semibold border px-4 py-2 whitespace-pre ${employeeType === "POS Staff" ? "bg-blue-600" : "bg-red-400"}`}>POS Staff</button></li> */}
                    <li className='list-none'><button onClick={(e) => setEmployeeType(e.target.value)} value="staff" className={`min-w-[100px] font-semibold border px-3 whitespace-pre py-2 ${employeeType === "staff" ? "bg-blue-600 text-white" : "bg-red-400"}`}>Staff</button></li>
                    <li className='list-none'><button onClick={(e) => setEmployeeType(e.target.value)} value="user" className={`min-w-[100px] font-semibold border px-3 py-2 whitespace-pre ${employeeType === "user" ? "bg-blue-600 text-white" : "bg-red-400"}`}>Customer</button></li>
                </nav>
                <hr className='mt-4 bg-slate-800 h-[2px] mx-5' />
                <div className='pb-8'>
                    {
                        employeeType === 'user' ?
                            <CustomerCreateForm
                                employeeType={employeeType}
                            />
                            : <EmployeeCreateForm
                                employeeType={employeeType}
                                formHeading={`Create a ${employeeType} Account`}
                            />
                    }
                </div>
            </main>
        </div>
    );
};

export default CreateEmployee;