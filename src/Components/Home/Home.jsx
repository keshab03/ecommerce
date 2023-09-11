import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    const [data, setData] = useState([]); // Here i am storing all the data fetched from the API
    const [selectedCategory, setSelectedCategory] = useState(''); // This will hold the selected category while filtering by category
    const [selectedPrice, setSelectedPrice] = useState(''); // This will hold the selected price either high or low while filtering by price
    const [selectedRating, setSelectedRating] = useState(''); // This will hold the selected rateing either high or low while filtering by rateing
    const [search, setSearch] = useState(''); // // This will hold the value entered in search box 

    // Here i am getting the data from the API and storing inside data[]
    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then((response) => {
                // console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Here i am  filtering products based on field selection and storing inside filteredProducts
    let filteredProducts = data.filter((x) =>
        x.title.toLowerCase().includes(search.toLowerCase()) // It will work for search
        &&
        (!selectedCategory || x.category === selectedCategory) // It will check whether selected category is present or not
        &&
        (!selectedPrice || (selectedPrice === 'high' && x.price >= 50) || (selectedPrice === 'low' && x.price < 50) || (selectedPrice === 'low' && x.price < 150)) // This will work sort by price 
        &&
        (!selectedRating || (selectedRating === 'high' && x.rating.rate >= 4) || (selectedRating === 'low' && x.rating.rate < 4)) // This will work to sort by rateing
    );

    // Sort products from high to low for high price selection  
    if (selectedPrice === 'high') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }
    // Sort products from low to high for high price selection  
    else if (selectedPrice === 'low') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    return (
        <div id='backimg'>
            <div id='inp'>
                {/* This the search box */}
                <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />

                {/* This are the filtering options */}
                <div id='filter' >
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled>Filter by Category</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="electronics">Electronics</option>
                        {/* Add more options based on your data */}
                    </select>
                    <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                        <option value="" disabled>Filter by Price</option>
                        <option value="high">High Price</option>
                        <option value="low">Low Price</option>
                    </select>
                    <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                        <option value="" disabled>Filter by Rating</option>
                        <option value="high">High Rating</option>
                        <option value="low">Low Rating</option>
                    </select>
                </div>
            </div>

            {/* Here getting the data and mapping to show in UI */}
            <div id='prod'>
                {filteredProducts.map((x) => {
                    return (
                        <div key={x.id} id='prod-list'>
                            <Link to={`/products/${x.id}`} > {/* After click on a image it will go to that perticuler product */}
                                <img src={x.image} alt=""/>
                            </Link>
                            <p>MRP:<del>${x.price}</del> </p>
                            <p> Price: {Math.ceil(x.price - (x.price * 0.05))}</p>
                            <p>Discount: 5%</p>
                            <p>Rate By: {x.rating.count} People</p>
                            <p>Rating: {x.rating.rate}</p>
                            <h3>{x.title}</h3>                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
