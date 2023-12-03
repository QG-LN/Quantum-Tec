
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
// ----------------------------------------------------------------------

export default function ItemTableRow({row, selected, handleClick}) {
  return (
    <TableRow hover tabIndex={-1} onClick={() => handleClick(row)}>
      {Object.values(row).map((value, index) => (
        <TableCell key={index} align='center'>
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
}
