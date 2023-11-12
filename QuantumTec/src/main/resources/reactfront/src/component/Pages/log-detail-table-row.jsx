import { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import Iconify from '../../dashboard/components/iconify';

// ----------------------------------------------------------------------

export default function LogDetailTableRow({row, selected, handleClick
}) {

  const [isExpanded, setIsExpanded] = useState(false);

  const title = row.tableName;
  const content = row.oldValue + " -> " + row.newValue;
  // const content = "눌러서 자세히 보기";
  const changer = row.operatedBy;
  const changeDate = row.timestamp;
  const oldValue = row.oldValue.replace("{", "").replace("}", "").split(",");
  const newValue = row.newValue.replace("{", "").replace("}", "").split(",");

  const handleRowClick = () => {
    setIsExpanded(!isExpanded); // 행 클릭시 확장 상태 토글
  };

  return (
    <>
      <TableRow hover tabIndex={-1} selected={selected} onClick={handleRowClick}>
        
        <TableCell align='center'>{title}</TableCell>

        <TableCell align='center'>{content.length > 20 ? content.substring(0, 30) + "..." : content}</TableCell>

        <TableCell align="center">
          {changer}
        </TableCell>

        <TableCell align='center'>
          {changeDate}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>

            <Grid container>
              <Grid item xs={6} sm={6} md={6} className='p-3'>
                {oldValue.map((value) => (
                  <div>
                    {value}
                  </div>
                ))}
              </Grid>
              <Grid item xs={6} sm={6} md={6} className='p-3'>
                {newValue.map((value) => (
                  <div>
                    {value}
                  </div>
                ))}
              </Grid>
            </Grid>
          </Collapse>
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
