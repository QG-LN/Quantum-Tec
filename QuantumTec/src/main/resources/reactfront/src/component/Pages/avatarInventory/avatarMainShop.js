
import AvatarItemCheck from './avatarItemCheck';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';

export default function AvatarMainInventory(props) {
    const avatarCategoryList = useSelector(state => state.avatar.categoryList);
    
    if (!avatarCategoryList) {
        return null;
    }

    const ShowCarousel = (c) => {
        // const firstList = props.itemList.filter(item => item.itemCategoryName === c.category).slice(0, 5); // 0부터 4까지
        // const secondList = props.itemList.filter(item => item.itemCategoryName === c.category).slice(5, 10); // 5부터 9까지
        const firstList = props.itemList.slice(0, 5); // 0부터 4까지
        const secondList = props.itemList.slice(5, 10); // 5부터 9까지
        console.log(secondList.length)
        return (
            <Carousel interval={null}>
                <Carousel.Item>
                    <div className='ms-[3%] my-4 d-flex flex-wrap align-items-center'>
                        <AvatarItemCheck itemList={firstList}/>
                    </div>
                </Carousel.Item>
                {secondList.length === 0 ? null :
                <Carousel.Item>
                    <div className='ms-[3%] my-4 d-flex flex-wrap align-items-center'>
                        <AvatarItemCheck itemList={secondList}/>
                    </div>
                </Carousel.Item>
                }
            </Carousel>
        );
    }
    console.log(avatarCategoryList)
    return (
        <>
            {avatarCategoryList.map((category) => (
                <div className='mt-2 mb-1 me-3'>
                    <div className='d-flex align-items-center'>
                        <h5 className={category.length > 2 ? 'w-[20%]' : 'w-[18%]'}>모든 {category} 아이템</h5>
                        <button type="button" class="btn btn-secondary btn-sm" id={category} onClick={props.onClick}>모두 보기 ({avatarCategoryList.length})</button>
                        <hr className='flex-fill mx-3'/>
                    </div>
                    <ShowCarousel category={category}/>
                </div>
            ))}
        </>
    );
}