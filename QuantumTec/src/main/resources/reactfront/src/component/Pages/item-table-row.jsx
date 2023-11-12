
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
// ----------------------------------------------------------------------

export default function ItemTableRow({row, selected, handleClick
}) {
  const paymentIndex = row.paymentIndex;
  const productType = row.productType;
  const productName = row.productName;
  const paymentAmount = row.paymentAmount;
  const paymentMethod = row.paymentMethod;
  const paymentStatus = row.paymentStatus;
  const paymentDate = row.paymentDate.split(" ")[0];



  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align='center'>{paymentIndex}</TableCell>

        <TableCell align='center'>{productType}</TableCell>

        <TableCell align="center">
          {productName}
        </TableCell>

        <TableCell align='center'>
          {paymentAmount}
        </TableCell>

        <TableCell align='center'>
          {paymentMethod}
        </TableCell>

        <TableCell align='center'>
          {paymentStatus}
        </TableCell>

        <TableCell align='center'>
          {paymentDate}
        </TableCell>
      </TableRow>
    </>
  );
}
