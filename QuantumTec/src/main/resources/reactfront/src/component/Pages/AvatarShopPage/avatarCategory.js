import React, { useState, useEffect } from 'react';

export default function AvatarCategory(props) {
    const [avatarCategory, setAvatarCategory] = useState([]); // 카테고리 목록
    useEffect(() => {
        const tempArray = [];
        tempArray.push({ id: 1, name: props.categoryName });
        setAvatarCategory(avatarCategory.concat(tempArray))
    }, []);
    return (
        <div className="">
            {avatarCategory.map((category) => (
                <div>
                    <span>{category.name}</span>
                </div>      
            ))}
        </div>
    );
};

