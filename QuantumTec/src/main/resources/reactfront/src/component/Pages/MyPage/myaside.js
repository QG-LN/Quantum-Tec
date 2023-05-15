import {useState} from 'react';
import '../../../styles.css';

//my page에서 select값을 가져와 setSelect으로 값을 변경한다.
export default function Myaside({select, setSelect}){
    const astyle={
        textDecorationLine: 'none',
        color: 'black',
    }
    //css 부분 나중에 옮길것
    const asideStyle = {
        borderRight: 'solid #42b983',
        padding: '0px',
        height : '82vh', 
      };
    const listStyle ={
        height : '5vh',
    }
    const uiStyle ={
        listStyleType : 'none',
        paddingLeft: '0px',
    }


    //카테고리 리스트 설정
    const [list, setList] = useState(["마이페이지", "사용자설정","결제방식", "회원탈퇴"]);

   // 카테고리 클릭시 해당 값을 mypage에 전송
    const handleClick = (e) => {
        setSelect(e.target.text);
        const sublist = e.target.closest('ul').querySelector('.sublist');
        sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
    };

        return(
            <div>
                <aside style={asideStyle}>
                <div>
                    <h2 class='asideh2'>카테고리</h2>
                    <ul class='asideul' style={uiStyle}>
                                {list.map((item, index) => (
                                // <li class='listyle' style={listStyle} key={index} onClick={handleClick}><a class='astyle' style={astyle}>{item}</a></li>
                                <li class='listyle' style={listStyle} key={index} onClick={handleClick}><a class='astyle' style={astyle}>{item}</a>{item === "사용자설정" && (
                                    <ul
                                      class='sublist'
                                      style={{
                                        display: "none",
                                      }}
                                    >
                                      <li>사용자 설정 1</li>
                                      <li>사용자 설정 2</li>
                                    </ul>
                                  )}
                  </li>
                                ))}
                    </ul>
                </div>
            </aside>
            </div>
        )
}