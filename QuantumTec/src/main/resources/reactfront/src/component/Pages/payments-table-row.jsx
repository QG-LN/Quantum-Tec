import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Label from '../../dashboard/components/label';

import Iconify from '../../dashboard/components/iconify';

// ----------------------------------------------------------------------

export default function PaymentsTableRow({row, selected, handleClick
}) {
  const index = row.paymentIndex;
  const payhistory = row.paymentName;
  const userid = row.userId;
  const paytype = row.paymentMethod;
  const payday = row.paymentDate;
  const paystates = row.paymentStatus;
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell align='center'>{index}</TableCell>

        <TableCell align="center">
          {payhistory}
        </TableCell>

        <TableCell align='center'>
          {userid}
        </TableCell>

        <TableCell align='center'>
          {paytype}
        </TableCell>

        <TableCell align='center'>
          {payday}
        </TableCell>

        <TableCell align='center'>
          <Label color={((paystates === '결제 실패' || paystates === "환불") && 'error') || 'success'}>{paystates}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

PaymentsTableRow.propTypes = {
  boardcategory: PropTypes.any,
  boardname: PropTypes.any,
  user: PropTypes.any,
  day: PropTypes.any,
  views: PropTypes.any,
  index: PropTypes.any,
  handleClick: PropTypes.func,
  recommend: PropTypes.any,
  comment: PropTypes.any,
  selected: PropTypes.any,
};
