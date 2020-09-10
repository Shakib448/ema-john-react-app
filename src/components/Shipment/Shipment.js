import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css'
import { UserContext } from '../../App';



const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >

            < input name="name" defaultValue={loggedInUser.name} placeholder="Your name please" ref={register({ required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            < input defaultValue={loggedInUser.email} name="email" ref={register({ required: true })} />
            {errors.name && <span className="error">Email is required</span>}

            < input placeholder="Your address" name="address" ref={register({ required: true })} />
            {errors.name && <span className="error">Address is required</span>}

            <input type="submit" />
        </form >
    );
}

export default Shipment;
