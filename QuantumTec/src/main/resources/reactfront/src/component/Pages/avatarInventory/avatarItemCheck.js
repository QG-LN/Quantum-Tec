import React from 'react';
import AvatarItem from './avatarItem';

export default function AvatarItemCheck(props) {
    if (props.itemList.length === 0) {
        return (
            <div>
                <h5 className='text-center'>아이템이 없습니다.</h5>
            </div>
        );
    }
    else {
        return (
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {props.itemList.map((item) => (
                    <AvatarItem item={item}/>
                ))}
            </div>
        )
    }
}
