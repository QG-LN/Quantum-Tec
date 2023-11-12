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

export default function BoardTableRow({row, selected, handleClick
}) {

  const boardname = row.boardname;
  const user = row.user;
  const boardcategory = row.boardcategory;
  const recommend = row.recommend;
  const views = row.views;
  const comment = row.comment;
  const index = row.index;
  const day = row.day;
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

        <TableCell align='center'>{boardcategory}</TableCell>

        <TableCell align="center">
          {boardname}
        </TableCell>

        <TableCell align='center'>
          {user}
        </TableCell>

        <TableCell align='center'>
          {day}
        </TableCell>

        <TableCell align='center'>
          {views}
        </TableCell>

        <TableCell align='center'>
          {recommend}
        </TableCell>
        <TableCell align='center'>
          {comment}
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

BoardTableRow.propTypes = {
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
