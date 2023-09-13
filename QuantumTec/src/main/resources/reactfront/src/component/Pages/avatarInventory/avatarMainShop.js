
import AvatarItemCheck from './avatarItemCheck';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';

export default function AvatarMainInventory(props) {
    const avatarCategoryList = useSelector(state => state.avatar.categoryList);

    if (!avatarCategoryList) {
        return null;
    }
    const ShowCarousel = (c) => {
        const firstList = props.itemList.filter(item => item.itemCategoryName === c.category).slice(0, 5); // 0부터 4까지
        const secondList = props.itemList.filter(item => item.itemCategoryName === c.category).slice(5, 10); // 5부터 9까지
        const listSize = firstList.length + secondList.length;
        // const firstList = props.itemList.slice(0, 5); // 0부터 4까지
        // const secondList = props.itemList.slice(5, 10); // 5부터 9까지
        return (
            <>
                <div className='d-flex align-items-center'>
                    <h5 className={c.category.length > 2 ? 'w-[20%]' : 'w-[18%]'}>모든 {c.category} 아이템</h5>
                    <button type="button" class="btn btn-secondary btn-sm" id={c.category} onClick={props.onClick}>모두 보기 ({listSize})</button>
                    <hr className='flex-fill mx-3'/>
                </div>
                <Carousel interval={null}>
                    <Carousel.Item>
                        <div className='ms-[3%] my-4 '>
                            <AvatarItemCheck itemList={firstList} refreshKey={props.refreshKey}/>
                        </div>
                    </Carousel.Item>
                    {secondList.length === 0 ? null :
                    <Carousel.Item>
                        <div className='ms-[3%] my-4 '>
                            <AvatarItemCheck itemList={secondList} refreshKey={props.refreshKey}/>
                        </div>
                    </Carousel.Item>
                    }
                </Carousel>
            </>
        );
    }
    console.log(avatarCategoryList)
    return (
        <>
            {avatarCategoryList.map((category) => (
                <div className='mt-2 mb-1 me-3'>
                    <ShowCarousel category={category}/>
                </div>
            ))}
        </>
    );
}