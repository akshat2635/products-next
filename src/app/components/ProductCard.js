import React, { useState } from 'react';

export default function ProductCard({ product }) {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className={`relative w-64 h-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden m-4 transition-transform duration-300 transform ${
                    hover ? 'scale-105 shadow-2xl' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover" />

                <div className="p-3">
                    <h2 className="font-semibold text-md">{product.title}</h2>
                    {product.brand && (
                        <p className="text-gray-600 text-sm">Brand: {product.brand}</p>
                    )}

                    <p className="text-gray-900 font-bold text-lg">${product.price}</p>
                    <p className="text-gray-500 text-sm">Rating: {product.rating} ⭐</p>

                    <p className="text-gray-500 text-sm">
                        {product.availabilityStatus} 
                        {product.availabilityStatus === 'In Stock' && (
                            <span className="text-green-600"> | {product.shippingInformation.slice(0,22)}</span>
                        )}
                    </p>

                    <p className="text-gray-600 text-sm">
                        Tags:{product.tags && product.tags.join(', ')}
                    </p>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out ${
                        hover ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>

                    <div className="bg-gray-300 p-3 rounded-b-lg h-32 overflow-auto">
                        <h3 className="text-sm font-bold mb-2 text-gray-700">Customer Reviews</h3>
                        <div className="overflow-auto">
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <div key={index} className="border-b border-gray-300 mb-2 pb-2 text-gray-800">
                                        <p className="font-semibold">{review.reviewerName}:</p>
                                        <p className="italic">"{review.comment}"</p>
                                        <p>Rating: {review.rating} ⭐</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
