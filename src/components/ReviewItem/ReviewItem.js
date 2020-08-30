import React from 'react'

const ReviewItem = (props) => {

    const {name , quantity} = props.product

    const reviewItemStyle = {
        borderBottom : '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom : '5px'
    }

    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <br/>
            <button className="add-to-cart">Remove</button>
        </div>
    )
}

export default ReviewItem;
