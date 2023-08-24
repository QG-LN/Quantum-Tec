
import AvatarItemCheck from './avatarItemCheck';

export default function AvatarMainInventory(props) {
    return (
        <div className='mt-2 mb-5'>
            <div className='text-center'>
                <h5>모든 아이템</h5>
                <hr className='mx-3'/>
            </div>
            <div className='ms-4 mt-4 d-flex flex-wrap align-items-center'>
                <AvatarItemCheck itemList={props.itemList}/>
            </div>
        </div>
    );
}