import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../dashboard/components/iconify';

// ----------------------------------------------------------------------

// 게임의 메인 테이블의 행값을 받아와서 테이블의 행을 구성하는 컴포넌트
export default function GameTableRow({row, selected, handleClick}) {
  
  // 전달받은 데이터 키값과 매핑
  const index = row.gameIndex;           
  const name = row.gameName;
  const price = row.gamePrice;
  const company = row.gameDeveloper;
  const category = row.gameCategoryId;
  const review = row.gameRating;
  const day = row.gameReleaseDate;        
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleClickRow = (event) => {
    navigate(`/dashboard/game/${index}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={handleClickRow}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell align='center'>{index}</TableCell>

        <TableCell align='center'>{name}</TableCell>

        <TableCell align="center">
          {price}
        </TableCell>

        <TableCell align='center'>
          {company}
        </TableCell>

        <TableCell align='center'>
          {category}
        </TableCell>

        <TableCell align='center'>
          {day}
        </TableCell>

        <TableCell align='center'>
          {review}
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
          <Iconify icon="eva:edit-fill" sx={{  mr: 2 }} />
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

GameTableRow.propTypes = {
  gameName: PropTypes.any,
  price: PropTypes.any,
  company: PropTypes.any,
  category: PropTypes.any,
  review: PropTypes.any,
  index: PropTypes.any,
  handleClick: PropTypes.func,
  day: PropTypes.any,
  selected: PropTypes.any,
};
