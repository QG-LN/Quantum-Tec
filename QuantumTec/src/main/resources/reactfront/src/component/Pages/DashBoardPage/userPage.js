import { useState } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { useLocation } from "react-router-dom";
import Iconify from "../../../dashboard/components/iconify";
import Scrollbar from "../../../dashboard/components/scrollbar";

import TableNoData from "../table-no-data";
import DataTableHead from "../table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

// ----------------------------------------------------------------------
// styled를 사용하여 커스텀 Container 컴포넌트 생성
const CustomContainer = styled(Container)(({ theme, margin }) => ({
  "@media (min-width: 1200px)": {
    marginLeft: margin === undefined ? "279px" : "0px",
  },
}));
export default function TablePage(props) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: Array.isArray(props.data) ? props.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
    headLabel: props.dataLabel,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const location = useLocation();
  const pageName = location.pathname;

  return (
    <>
      <CustomContainer style={{ marginTop: "100px" }} margin={props.margin}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">{pageName}</Typography>
          <div className="left-0 flex">
            <div class='mr-5'>
              <Button
                variant="contained"
                color="inherit"
              >
                내보내기
              </Button>
            </div>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New {pageName}
            </Button>
          </div>
            {/*mayone--version*/}
            {/*<Styles className={props.title!==""?'mt-[12vh]':''}>*/}

            {/*    <Container>*/}
            {/*        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>*/}
            {/*            {props.title!==""?<Typography variant="h4">{props.title}</Typography>:<></>}*/}

            {/*            {props.createButton===undefined?<Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>*/}
            {/*                /!* 수정할 것 *!/*/}
            {/*                New User*/}
            {/*            </Button>:<></>}*/}
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <DataTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={props.data.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={props.createButton===undefined?handleSelectAllClick:undefined}
                  headLabel={props.dataLabel}
                  />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <props.dataRow
                        row={row}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, props.data.length)}
                  />

                  {notFound && <TableNoData query={filterName} col={props.dataLabel.length}/>}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
      </CustomContainer>
    </>
  );
}
