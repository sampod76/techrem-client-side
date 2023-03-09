import React from 'react';

const DeleteConfirmModal = ({ deletedData, setDeletedData, deleteSuccess, dataType }) => {
    return (
        <div
            className='fixed top-0 left-0 flex z-20 justify-center items-center w-full h-screen'
            style={{ background: "rgba(80, 21, 76, 0.50)" }}
        >
            <div className='drop-shadow-sm w-[350px] rounded-xl px-8 py-6 z-30 mb-40 bg-slate-50 border relative'>
                <h2 className='text-xl text-blue-600 text-center mb-1'>Confirm to delete the <span>{dataType}</span></h2>
                <div>
                    { deletedData?.serviceName && <h6 className='text-center text-lg font-sans'>{deletedData?.serviceName} {deletedData.price+" "+"taka"}</h6>}
                    { deletedData?.email && <h6 className='text-center text-lg font-sans'>{deletedData?.email}</h6>}
                </div>
                <div className='flex justify-center gap-3 my-4 mt-6'>
                    <button
                        onClick={deleteSuccess}
                        className='text-lg font-semibold px-4 py-1 rounded-md bg-red-400 outline outline-1 outline-orange-400 hover:bg-red-600 hover:text-white active:bg-red-700 '
                    >Delete</button>
                    <button
                        onClick={() => setDeletedData(null)}
                        className='text-lg font-semibold px-4 py-1 rounded-md bg-slate-50 outline outline-1 outline-orange-400 hover:bg-yellow-400 hover:text-white active:bg-yellow-500'
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;