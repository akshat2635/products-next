"use client"; // Required to indicate this is a client component

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSkip, setProducts } from '../redux/store'; // Adjust based on your file structure
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from './components/ProductCard';
import Spinner from './components/Spinner';

export default function Home() {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.data.selectedCategory);
    const products = useSelector((state) => state.data.products);
    const searchQuery = useSelector((state) => state.data.searchQuery);
    const limit = useSelector((state) => state.data.limit); 
    const skip = useSelector((state) => state.data.skip);
    const [hasMore, setHasMore] = useState(true); 
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://dummyjson.com/products${selectedCategory}?limit=${limit}&skip=${skip}`);
            const data = await response.json();
    
            if (response.ok) {
                const prevProducts = products;
                const updatedProducts = [...prevProducts, ...data.products];
                dispatch(setProducts(updatedProducts));
                
                if (updatedProducts.length >= data.total) {
                    setHasMore(false); 
                }
            }
        };

        if (skip === 0) setHasMore(true);
        if (selectedCategory !== "search") {
            fetchProducts();
        }
    }, [selectedCategory, skip, limit, dispatch]);

    if (searchQuery.length > 0) {
        if (products.length === 0) {
            return (
                <div className="container mx-auto my-4 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4 text-white">No Products found for {searchQuery}</h1>
                </div>
            );
        }
        return (
            <div className="container mx-auto my-4 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4 text-white">Results for {searchQuery}</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-hidden">
                    {products.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-white">
                {selectedCategory.length > 0 && selectedCategory !== "search" 
                    ? selectedCategory.split('/')[2].toUpperCase() 
                    : searchQuery.length > 0 
                    ? `Results for ${searchQuery}` 
                    : "All Products"}
            </h1>
            
            <InfiniteScroll
                dataLength={products.length}
                next={() => dispatch(setSkip(skip + limit))}
                hasMore={hasMore}
                loader={<div className="flex justify-center my-10"><Spinner /></div>}
            >
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-hidden">
                    {products.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
