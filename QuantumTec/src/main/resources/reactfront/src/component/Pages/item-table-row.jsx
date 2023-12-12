
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
  const commentWriterIndex = Object.keys(data).indexOf('commentWriter');
  let whereIndex = -1;
  if (userIdIndex !== -1) {
    whereIndex = userIdIndex;
  }
  else if (userNameIndex !== -1) {
    whereIndex = userNameIndex;
  }
  else if (commentWriterIndex !== -1) {
    whereIndex = commentWriterIndex;
  }
  
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
