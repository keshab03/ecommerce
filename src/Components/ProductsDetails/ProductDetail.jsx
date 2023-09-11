import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './productsdetails.css'
const ProductDetail = () => {
    //Here i am storing the perticuler product selected by user by product id
    const [data, setData] = useState('');
    //Here i am storing all the data getting from the API to compare the product with same category 
    const [similarProducts, setSimilarProducts] = useState([]);
    //here i am getting id from the url and store it in a variable Id
    const { id } = useParams();

    // Here i am getting a perticuler product based on id
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setData(response.data);
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    
    //  Here i am getting all the data and compareing with the
    //  product category and filtering the product with same 
    //  category 

    useEffect(() => {
        if (data) {
            axios.get('https://fakestoreapi.com/products')
                .then((response) => {
                    const filteredSimilarProducts = response.data.filter((product) => 
                        product.category === data.category && product.id !== id
                    );
    
                    setSimilarProducts(filteredSimilarProducts);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [data, id]);
    
    return (
        <div>
            {/* Here i am showing the details of that perticuler product selected by user */}
            {data && (
                <div id='product'>
                    <img src={data.image} alt={data.title} />
                    <h2># {data.title}</h2>
                    <p><b>MRP:</b> <del>${data.price}</del></p>
                    <p><b>Price:</b> {Math.ceil(data.price - (data.price * 0.05))}</p>
                    <p><b>Discount:</b> 5%</p>
                    <p><b>Rate By:</b> {data.rating.count} People</p>
                    <p><b>Rating:</b> {data.rating.rate}</p>
                    <p> <b>Description: </b> {data.description}</p>
                </div>
            )}

            <h2 style={{ margin: '5vh' }}># You may also like</h2>
           {/* Here i am showing the simeler products */}
            <div id='smprd'>
                {similarProducts.map((x) => {
                    return (
                        <div key={x.id}>
                            <Link to={`/products/${x.id}`}> {/* After clicking on the image it will also show the details of that product */}
                                <img src={x.image} alt={x.title} />
                            </Link>
                            <h2>{x.title}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ProductDetail;