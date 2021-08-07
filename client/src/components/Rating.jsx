import React from "react";

const Rating = ({ starNumber }) => {
    let noOfStar = starNumber;

    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (noOfStar - i <= 0) {
            stars.push(<i key={i} className="far fa-star"></i>);
        } else if (noOfStar - i < 1 && noOfStar - i >= 0) {
            stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
        } else {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
    }

    return (
        <div>
            <div className="all-star text-danger">{stars}</div>
        </div>
    );
};

export default Rating;
