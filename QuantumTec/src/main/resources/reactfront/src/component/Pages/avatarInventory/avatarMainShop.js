
import AvatarItemCheck from './avatarItemCheck';
import { useSelector } from 'react-redux';

export default function AvatarMainInventory(props) {
    const avatarCategoryList = useSelector(state => state.avatar.categoryList);
    
    if (!avatarCategoryList) {
        return null;
    }
    console.log(avatarCategoryList)
    return (
        <>
            {avatarCategoryList.map((category) => (
                <div className='mt-2 mb-5'>
                    <div className='d-flex align-items-center'>
                        <h5 className={category.length > 2 ? 'w-[20%]' : 'w-[18%]'}>모든 {category} 아이템</h5>
                        <button type="button" class="btn btn-secondary btn-sm" id={category} onClick={props.onClick}>모두 보기 ({avatarCategoryList.length})</button>
                        <hr className='flex-fill mx-3'/>
                    </div>
                    <div className='ms-4 mt-4 d-flex flex-wrap align-items-center'>
                        <AvatarItemCheck itemList={props.itemList.filter(item => item.itemCategoryName === category)}/>
                    </div>
                </div>
            ))}
        </>
    );
}