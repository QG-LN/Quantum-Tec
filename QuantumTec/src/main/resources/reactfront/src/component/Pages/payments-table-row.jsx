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

import { axiosRequest } from '../Utils/networkUtils';

// ----------------------------------------------------------------------

export default function PaymentsTableRow({row, selected, handleClick
}) {
  const index = row.paymentIndex;
  const payhistory = row.paymentName;
  const userid = row.userId;
  const paytype = row.paymentMethod;
  const payday = row.paymentDate;
  const paystates = row.paymentStatus;
  const userIndex = row.userIndex;
  const category = row.paymentCategory;
  const price = row.paymentPrice;
  const itemIndex = row.paymentItemIndex;

  const [open, setOpen] = useState(null);
  const editMenu = row.paymentStatus !== '결제 실패';

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRefund = () => {
    if(paystates === '환불'){
      let body;
      let path;
      if(category === "Cash"){
        body = {
          paymentIndex: index,
          paymentStatus: '결제 완료',
          userIndex: userIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/cash';
      }
      else if(category === "Avatar"){
        body = {
          paymentIndex: index,
          paymentStatus: '결제 완료',
          userIndex: userIndex,
          paymentItemIndex: itemIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/avatar';
      }
      else if(category === "Game"){
        body = {
          paymentIndex: index,
          paymentStatus: '결제 완료',
          userIndex: userIndex,
          paymentItemIndex: itemIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/game';
      }

      axiosRequest(path, body, 'POST', 'json')
        .then((response) => {
          if(response.data === 'success'){
            alert('환불 취소 완료');
            // window.location.reload();
          }
          else{
            alert('환불 취소 실패');
          }
        });

    }
    else if(paystates === '결제 완료'){
      let body;
      let path;
      if(category === "Cash"){
        body = {
          paymentIndex: index,
          paymentStatus: '환불',
          userIndex: userIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/cash';
      }
      else if(category === "Avatar"){
        body = {
          paymentIndex: index,
          paymentStatus: '환불',
          userIndex: userIndex,
          paymentItemIndex: itemIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/avatar';
      }
      else if(category === "Game"){
        body = {
          paymentIndex: index,
          paymentStatus: '환불',
          userIndex: userIndex,
          paymentItemIndex: itemIndex,
          paymentPrice: price
        };
        path = '/dashborad/payment/refund/game';
      }

      axiosRequest(path, body, 'POST', 'json')
        .then((response) => {
          if(response.data === 'success'){
            alert('환불 완료');
            // window.location.reload();
          }
          else{
            alert('환불 실패');
          }
        });
    }
      
    handleCloseMenu();
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
        {editMenu && (
          <MenuItem onClick={handleRefund}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {paystates === '환불' ? '환불 취소' : '환불 처리'}
          </MenuItem>
        )}

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
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
