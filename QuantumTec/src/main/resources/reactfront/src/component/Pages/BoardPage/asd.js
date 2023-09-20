import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'

function App() {
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 여부를 관리
    const categories = [
        '카테고리 1',
        '카테고리 2',
        '카테고리 3',
        // 원하는 만큼 카테고리를 추가할 수 있습니다.
      ];
    
      const toggleDropdown = () => {
          setShowDropdown(!showDropdown);
        };
    return (
        <div>
        </div>
    );
}

export default App;
