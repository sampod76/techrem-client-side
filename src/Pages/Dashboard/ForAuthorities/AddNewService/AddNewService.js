import axios from 'axios';
import { async } from 'q';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPenAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePostNewServiceMutation } from '../../../../app/features/product/serviceApi';
import SmallSpinner from '../../../../component/spinner/SmallSpinner';
import ProgressBar from "@ramonak/react-progress-bar";
import { multipartHeaders } from '../../../../utils/headers';
import { usePostCategoryMutation } from '../../../../app/features/others/categoriesApi';
import CategoryAddInputs from '../../../../component/form/CategoryAddInputs';


const AddNewService = () => {
    const [ctgValue, setCtgValue] = useState({ mainCtg: "", subCtg_1: "", subCtg_2: "" });
    const [preview, setPreview] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const [upLoaded, setUpLoaded] = useState(null);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [postCategory, { isLoading: postLoading, }] = usePostCategoryMutation();
    const [postNewService, { isLoading, isSuccess, isError, error }] = usePostNewServiceMutation();


    useEffect(() => {
        if (isError) {
            console.log(error)
        } else if (isSuccess) {
            toast.success("Added your product");
            reset();
            setCtgValue({ mainCtg: "", subCtg_1: "", subCtg_2: "" });
            setUpLoaded(null);
            setPreview({});
        }
    }, [isError, isSuccess]);

    const handleCreateService = async data => {
        setCtgValue({ ...ctgValue, error: "" })
        if (!ctgValue.mainCtg) {
            return setCtgValue({ ...ctgValue, error: "Service all category setup is required!" });
        }

        delete data.serviceImage;
        data.category = {
            mainCategory: ctgValue?.mainCtg,
            subCategory1: ctgValue?.subCtg_1,
            subCategory2: ctgValue?.subCtg_2,
        };
        postCategory(ctgValue).then(async (res) => {
            setCtgValue({ ...ctgValue, error: "" })
            if (res.data.success) {
                if (imgFile) {
                    const formData = new FormData();
                    formData.append('image', imgFile);
                    const result = await axios.post(`${process.env.REACT_APP_DEV_URL}/img`, formData, {
                        onUploadProgress: (data) => {
                            setUpLoaded(Math.round((data.loaded / data.total) * 100));
                        },
                        headers: multipartHeaders
                    })
                    if (result.data.file) {
                        // console.log(result.data.file);
                        postNewService({ ...data, image: result.data.file }).then(res => {
                            if (!res.data?.success) {
                                toast.error(res.data.message)
                            }
                        })
                    } else {
                        console.log(result);
                    };
                } else {
                    postNewService(data).then(res => {
                        if (!res.data?.success) {
                            toast.error(res.data.message)
                        }
                    })
                }
            } else {
                toast.error(res.data.message)
            }
        }).catch(e => {
            console.log(e)
            setCtgValue({ ...ctgValue, error: "" })
        })
    };
    return (
        <div
            className='w-full px-6 lg:px-4 xl:px-0'
            style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(138, 255, 71, 0.3)), url(https://png.pngtree.com/thumb_back/fh260/background/20201024/pngtree-d-illustration-mock-up-scene-geometry-shape-platform-forms-for-product-image_435976.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <h2 className='text-2xl text-center'>Add your new service to post.</h2>
            <form
                onSubmit={handleSubmit(handleCreateService)}
                className='my-6 lg:max-w-3xl xl:max-w-5xl mx-auto'
            >
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-8 smm:col-span-4 md:col-span-8 mdd:col-span-4 lg:col-span-5 mb-4'>
                        <div className="w-full mb-4">
                            <label htmlFor='massage-name' className="font-medium">Massage name*</label>
                            <input
                                {...register("serviceName", { required: "Name field is required!" })}
                                id='massage-name' type="text" placeholder="Enter new massage name"
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            {errors.serviceName?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.serviceName?.message}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor='heading' className="font-medium">Additional heading *</label>
                            <input
                                {...register("additionalHeading", { required: "Heading field is required!" })}
                                id='heading' placeholder="Enter service heading" type="text"
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            {errors.additionalHeading?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.additionalHeading?.message}</p>}
                        </div>
                    </div>
                    <div className='col-span-8 smm:col-span-4 md:col-span-8 mdd:col-span-4 lg:col-span-3 max-w-xs relative'>
                        <div className='static smm:absolute md:static mdd:absolute w-[100%] min-h-[180px] left-1 mdd:top-7 rounded-lg border-2 border-gray-500 bg-slate-300 hover:bg-green-200'>
                            <label htmlFor="image" className='pt-16 smm:pt-[25%] md:pt-16 mdd:pt-[25%] block pl-[30%]'>{preview?.imageLive ? "" : "Image Upload"}</label>
                            <input
                                {...register("serviceImage")}
                                onChange={(e) => {
                                    setImgFile(e.target.files[0])
                                    setPreview({ imageLive: window.URL.createObjectURL(e.target.files[0]), imageText: e.target.files[0].name })
                                }}
                                type="file"
                                accept='image/*'
                                name="serviceImage"
                                id="image"
                                className='hidden'
                                multiple
                            />
                            <label htmlFor="image">
                                <div className='absolute right-1 bg-gray-200 top-1 rounded-full z-50 p-2 hover:bg-green-200 group'><FaPenAlt className='text-gray-600 group-hover:text-gray-700' /></div>
                            </label>
                            {preview?.imageLive && <img src={preview.imageLive} className='block h-[97.5%] w-[98.5%] absolute right-[2px] top-[1.5px] rounded-md' alt='preview_img' />}
                            {errors.serviceImage?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.serviceImage?.message}</p>}
                        </div>
                        {upLoaded &&
                            <div className='absolute -bottom-6 left-5 w-[90%]'>
                                <ProgressBar
                                    completed={upLoaded}
                                    maxCompleted={100}
                                />
                            </div>}
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4 mb-4'>
                    <div className='col-span-3 smm:col-span-1'>
                        <label htmlFor='priceDiscount' className="font-medium">Massage duration *</label>
                        <select
                            {...register("duration", { required: "service duration is required!" })}
                            className="w-full font-medium text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        >
                            <option value='00:30 minute'>⏱ 00:30 minute</option>
                            <option value='00:30 minute'>⏱ 00:40 minute</option>
                            <option value='00:30 minute'>⏱ 00:50 minute</option>
                            <option value='00:30 minute'>⏱ 01:00 minute</option>
                            <option value='00:30 minute'>⏱ 01:30 minute</option>
                        </select>
                        {errors.duration?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.duration?.message}</p>}
                    </div>
                    <div className='col-span-3 smm:col-span-2'>
                        <label htmlFor='massage-expenses' className="font-medium">Total cost for the massage(taka) *</label>
                        <input
                            {...register("price", { required: "Expense field is required!" })}
                            id='massage-expenses' placeholder="Enter massage expenses" type="text"
                            className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                        {errors.price?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.price?.message}</p>}
                    </div>
                </div>
                <CategoryAddInputs ctgValue={ctgValue} setCtgValue={setCtgValue}/>
                <div className="w-full mb-4">
                    <label htmlFor='description' className="font-medium">Write service details *</label>
                    <textarea
                        {...register("details", { required: "Service details field is required!" })}
                        id='description' placeholder="Write details about the massage here" type="text"
                        className="w-full h-fit text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.details?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.details?.message}</p>}
                </div>
                <button type='submit' className='w-40 px-8 py-3 mx-auto block mt-3 bg-blue-700 active:outline outline-green-500 active:text-yellow-400 font-semibold text-white rounded-md hover:bg-blue-800'>{isLoading ? <SmallSpinner /> : "Post Service"}</button>
            </form>
        </div>
    );
};

export default AddNewService;