import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Tablerow from './Tablerow'
import { styled } from 'styled-components';
import TablePagination, {
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import Searchbar from './Searchbar';

const DataTable = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);


  const fetchData = async (page) => {
    await axios.get('https://www.episodate.com/api/most-popular?page='+page)
      .then(res => {
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchData(1)
  }, [])

  const DataTableRow = () => {
    return data?.tv_shows?.map((res, i) => {
      return <Tablerow obj={res} key={i} />
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(page)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-wrapper mt-5">
      <p className="title my-5">Listado de TV Shows</p>
      <Searchbar />
      <Table striped hover>
        <thead className="py-5">
          <tr className="mt-5 align-center">
            <th>Imagen</th>
            <th>No. ID</th>
            <th>Nombre</th>
            <th>Productora</th>
            <th>Pais</th>
            <th>Fecha de Lanzamiento</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
            {DataTableRow()}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[20]}
              colSpan={8}
              count={Number(data?.total)}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </Table>
    </div>
  );
  
}

export default DataTable;


const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 968px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;