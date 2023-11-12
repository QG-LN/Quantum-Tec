import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../dashboard/components/iconify';

// ----------------------------------------------------------------------

export default function LogDetailTableRow({row, selected, handleClick
}) {

  const title = row.title;
  const content = row.content;
  const changer = row.changer;
  const changeDate = row.changeDate;
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

        <TableCell align='center'>{title}</TableCell>

        <TableCell>{content}</TableCell>

        <TableCell align="center">
          {changer}
        </TableCell>

        <TableCell align='center'>
          {changeDate}
        </TableCell>
      </TableRow>
    </>
  );
}

LogDetailTableRow.propTypes = {
  title: PropTypes.any,
  content: PropTypes.any,
  changer: PropTypes.any,
  changeDate: PropTypes.any
};
