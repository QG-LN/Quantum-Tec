import React, { useEffect } from 'react';

export default function AvatarItem(props) {
    useEffect(() => {
        // console.log(props);
    }, []);
    return (
        <div class="card w-[18.5%] ms-2 placeholder-glow mb-4" aria-hidden="true">
            <div class="placeholder ratio ratio-1x1 rounded-top"></div>
            {/* <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/> */}
            <div class="text-start m-3">
                <h5 class="card-title placeholder-glow">
                    {props.item.name}
                {/* <div class="placeholder col-5"></div> */}
                </h5>
                <h6 class="card-text placeholder-glow">
                    <div class="placeholder col-7"></div>
                </h6>
                <h6 class="card-text placeholder-glow text-end">
                    <div class="placeholder col-5"></div>
                </h6>
            </div>
        </div>
    );
}

