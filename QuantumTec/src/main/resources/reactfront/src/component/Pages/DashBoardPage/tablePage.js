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

import ExportDataToExcelButton from "../../exportData/exportData";
import {handlerMappingUser, handlerMappingUserPayment, handlerMappingUserActive, 
      handlerMappingGame, handlerMappingGamePayment, handlerMappingGameComment,
      handlerMappingPost, handlerMappingPostComment
} from "../../exportData/headerMapping";

// ----------------------------------------------------------------------
// styled를 사용하여 커스텀 Container 컴포넌트 생성
const CustomContainer = styled(Container)(({ theme, margin }) => ({
  "@media (min-width: 1200px)": {
    marginLeft: margin === undefined ? "279px" : "0px",                 // margin이 undefined이면 279px, 아니면 0px
    maxWidth: `calc(100% - ${margin === undefined ? "279px" : "0px"})`, // margin을 포함하여 100%가 되도록 설정
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

  const location = useLocation(); // 현재 경로를 가져옴

  /**
   * 경로를 /로 나누고 2번째 인덱스를 대문자로 바꿔서 페이지 이름으로 사용
   * ex) /admin/user -> USER
   */
  // const pageName = location.pathname.split("/")[2].toUpperCase();
  const pageName = props.title !== undefined ? props.title.toUpperCase() : ""; // props.title을 페이지 이름으로 사용

  const header = props.dataLabel.map((item) => (item.label ?? ""));

  // 헤더에 해당하는 매핑 키 가져오기
  const getDynamicMappingKey = () => {
    if (pageName === "") return null; // 페이지 이름이 없으면 null 반환
    if(location.pathname.includes("/user")){
      if (pageName.includes("USERS")) {
        return handlerMappingUser;
      } else if(pageName.includes("결재내역")) {
        return handlerMappingUserPayment;
      } else if(pageName.includes("활동사항")) {
        return handlerMappingUserActive;
      }else{
        return null;
      }
    }else if(location.pathname.includes("/game")){
      if (pageName.includes("GAMES")) {
        return handlerMappingGame;
      }else if(pageName.includes("결제내역")) {
        return handlerMappingGamePayment;
      }else if(pageName.includes("댓글내역")){
        return handlerMappingGameComment;
      }else{
        return null;
      }
    }else if(location.pathname.includes("/board")){
      if(pageName.includes("BOARD")){
        return handlerMappingPost;
      }else if(pageName.includes("댓글리스트")){
        return handlerMappingPostComment;
      }
    }else{
      return null;
    }

  }

  // 전달 받은 데이터가 없으면 null 반환
  if (!props.data) {
    console.error("props.data is undefined or null");
    return null;
  }

  const data = props.data.map((item) => {
    const dynamicMappingKey = getDynamicMappingKey();

    if (dynamicMappingKey === null) {
      console.error("Dynamic mapping key is null.");
      return null;
    }

    let row = {};
    for (let i = 0; i < header.length; i++) {
      // const mappedKey = headerMappingUser[header[i]];                 // 헤더에 해당하는 매핑 키 가져오기
      const mappedKey = dynamicMappingKey[header[i]];

      // 값이 null 또는 undefined이면 빈 문자열로 설정
      const value = mappedKey ? (item[mappedKey] ?? "") : undefined;

      row[header[i]] = value;  // 헤더에 해당하는 값 설정
    }
    return row;
  });

  return (
    <>
      <CustomContainer style={{ marginTop: "100px" }} margin={props.margin}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">
              {pageName === undefined ? "" : pageName.split("_")[0]}
          </Typography>
          <div className="left-0 flex">
            <div class='mr-5'>
              {data[0] !== null ? <ExportDataToExcelButton title={"엑셀 다운로드"} fileName={pageName} data={data} header={header} /> : <></>}
            </div>
              {/* {props.createButton === undefined ? <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}>
              New {pageName}
              </Button>:<></>} */}
          </div>
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