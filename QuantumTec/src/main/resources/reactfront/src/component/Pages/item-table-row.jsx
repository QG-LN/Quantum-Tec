
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------

export default function ItemTableRow({row, selected, handleClick}) {
  const navigate = useNavigate();
  const data = row;
  const userIndex = data.userIndex;
  delete data.userIndex;
  const userIdIndex = Object.keys(data).indexOf('userId');
  const userNameIndex = Object.keys(data).indexOf('userName');
  const whereIndex = userIdIndex !== -1 ? userIdIndex : (userNameIndex !== -1 ? userNameIndex : -1);
  
  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/user/${userIndex}`);
    window.location.reload();
  }
  return (
    <TableRow hover tabIndex={-1} onClick={() => handleClick(data)}>
      {Object.values(data).map((value, index) => (
        <TableCell key={index} align='center'>
          {index === whereIndex ? (
          <a className='link-dark' style={{cursor: "pointer"}} onClick={handleUserClick}>{value}</a>
          ) : (
            value)
            }
        </TableCell>
      ))}
    </TableRow>
  );
}
