import React from 'react';

const ServiceReview = () => {
    const allReview = [
        {
            _id: "456464fsdjfjsajf56",
            comment: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            food: "Burger",
            foodId: "fkjdsjja58445",
            customer: "Khalek Hosen",
            time: "12:01 pm",
            date: "12-03-2023",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
        },
        {   
            _id: "456464fsdjljsajf56",
            comment: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            food: "Burger",
            foodId: "fkjdsjja58445",
            customer: "Khalek Hosen",
            time: "12:01 pm",
            date: "12-03-2023",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
        },
        {
            _id: "456464fsdjjkjjsajf56",
            comment: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            food: "Burger",
            foodId: "fkjdsjja58445",
            customer: "Khalek Hosen",
            time: "12:01 pm",
            date: "12-03-2023",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
        },
        {
            _id: "456464fsdjfklajf56",
            comment: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            food: "Burger",
            foodId: "fkjdsjja58445",
            customer: "Khalek Hosen",
            time: "12:01 pm",
            date: "12-03-2023",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
        },
    ]
    return (
        <div className='mt-4'>
            <h2 className='text-xl ml-4'>All service review</h2>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2 px-4'>
                {
                    allReview.map((review, i) => <div>
                        <section className='max-w-[400px]'>
                            <div className={`flex justify-start items-center gap-3 border-b px-4 py-2`}>
                                <div>
                                    <img src={review?.userImg} className="rounded-full h-12 w-12" alt="" />
                                </div>
                                <div className='flex-col justify-between'>
                                    <p className='text-xs font-bold text-green-600'>{review?.customer}</p>
                                    <h5 className='text-sm'><span className='text-black'>Review: </span><span className='font-sans'>{review.comment.slice(0,50)} <span>....</span></span></h5>
                                    <p className='text-xs text-gray-500 mt-1'><span className=''>{review.time}</span> {review.date}</p>
                                </div>
                            </div>
                        </section>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ServiceReview;