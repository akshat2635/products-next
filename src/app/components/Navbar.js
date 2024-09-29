"use client"; // This is crucial to specify that this component is for client-side rendering

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategories, setProducts, setSelectedCategory, setSkip, setSearchQuery } from '../../redux/store'; // Adjust the import based on your file structure

export default function Navbar() {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.data.selectedCategory);
    const searchQuery = useSelector((state) => state.data.searchQuery);
    const [Cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            const response = await fetch('https://dummyjson.com/products/category-list');
            const data = await response.json();
            if (response.ok) {
                dispatch(setAllCategories(data));
                setCats(data); 
            }
        };
        fetchCats();
    }, [dispatch]);

    const handleCategoryClick = (cat) => {
        let newCat = "";
        if (cat.length > 0) {
            newCat = "/category/" + cat;
        }
        if (newCat === selectedCategory && searchQuery.length === 0) {
            return;
        }
        dispatch(setSelectedCategory(newCat));
        dispatch(setProducts([]));
        dispatch(setSearchQuery(""));
        dispatch(setSkip(0));
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        if (query.length > 0) {
          const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
          const data = await res.json();
          dispatch(setProducts(data.products));
          dispatch(setSelectedCategory("search"));
          dispatch(setSearchQuery(query));
          dispatch(setSkip(0));
        }
    };

    return (
        <div className="navbar bg-base-300 rounded-box">
            <div className="flex-1 px-2 lg:flex-none">
                <button className="text-lg font-bold" onClick={() => handleCategoryClick("")}>Home</button>
            </div>
            <div className="flex flex-1 justify-end px-2 relative">
                <div className="form-control relative">
                <input
                    type="text"
                    className="input input-bordered md:w-80"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                    placeholder="Search Products..."
                />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">Categories</label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content grid grid-cols-2 bg-base-100 rounded-box z-[1] mt-4 w-[50vw] max-w-[300px] p-2 shadow"
                    >
                        {Cats.length > 0 ? (
                            Cats.map((cat) => (
                                <li key={cat}>
                                    <button onClick={() => handleCategoryClick(cat)} className="w-full text-left">{cat[0].toUpperCase()+cat.slice(1)}</button>
                                </li>
                            ))
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}
