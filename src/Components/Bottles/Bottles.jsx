import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLs, getStoredCart } from "../../Utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log('called the useEffect', bottles.length)
        if (bottles.length > 0) {
            const storedCart = getStoredCart();
            console.log(storedCart)
            const saveCart = [];
            for (const id of storedCart) {
                console.log(id)
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    saveCart.push(bottle);
                }
            }
            console.log(saveCart)
            setCart(saveCart)
        }
    }, [bottles])

    useEffect(() => {
        fetch('bottle.json')
            .then((response) => response.json())
            .then((data) => setBottles(data));
    }, [])


    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart)
        addToLs(bottle.id)
    }

    return (
        <div>
            <h2>Bottles Available : {bottles.length} </h2>
            <Cart cart={cart}></Cart>
            <div className="bottles-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>
        </div>

    );
};

export default Bottles;