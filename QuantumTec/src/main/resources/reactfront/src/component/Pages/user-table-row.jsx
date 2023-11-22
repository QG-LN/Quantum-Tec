import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../dashboard/components/label';
import Iconify from '../../dashboard/components/iconify';
import AvatarCanvas from './avatarInventory/avatarCanvas';

// ----------------------------------------------------------------------

export default function UserTableRow({row, selected, handleClick
}) {
  const navigate = useNavigate();

  const index = row.userIndex;
  const key = row.userID;
  const nickname = row.userNickname;
  const name = row.userName;
  const level = row.userLevel;
  const cash = row.userCash;
  const days = row.userAttendance;
  const status = row.userStatus;
  const avatarItemList = row.avatarItemList;

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickRow = (event) => {
    navigate(`/dashboard/user/${index}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={handleClickRow}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell align='center'>{index}</TableCell>

        <TableCell align='center'>{level}</TableCell>

        <TableCell component="th" scope="row" align='center'>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            {/* 아바타 수정 */}
            <div className="w-9 h-9">
              <AvatarCanvas size={[200,200]} position={[128,128]} circle={true} avatarItemList={avatarItemList}/>
            </div>
            <Typography variant="subtitle2" noWrap>
              {nickname}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">
          {name}
        </TableCell>

        <TableCell align='center'>
          <Label color={((status === 'banned' || status === "inactive") && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align='center'>
          {cash}
        </TableCell>

        <TableCell align='center'>
          {days}
        </TableCell>

        {/* 크기 줄여야 하는데... */}
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

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
