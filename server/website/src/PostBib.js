import React from 'react';
import Bib from './data/Bib.json'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: "name", label: 'Name', minWidth: 150, align: 'right' },
    { id: "city", label: 'City', minWidth: 100, align: 'right' },
    { id: "postal_code", label: 'Postal\u00a0Code', minWidth: 100, align: 'right' },
    { id: "type", label: 'Type', minWidth: 100, align: 'right' },
    { id: "price_min", label: 'Minimum\u00a0Price', minWidth: 100, align: 'right' },
    { id: "price_max", label: 'Maximum\u00a0Price', minWidth: 100, align: 'right' },
    { id: "phone", label: 'Phone\u00a0Number', minWidth: 100, align: 'right' },
    { id: "website", label: 'Website', minWidth: 100, align: 'right' },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: 'grey',
    },
    container: {
        maxHeight: '100%',
        backgroundColor: 'white',
    },
    head:{
        backgroundColor:'grey',
    }
});


const rows = Bib;



function PostMaitre() {


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table"  >
                    <TableHead >
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    className={classes.head}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.phone}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        if(value !== undefined)
                                        {
                                            if (!value.includes("http://")) {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                            }
                                            else return (
                                                <TableCell key={column.id} align={column.align} onClick = "window.location.href = {value}">
                                                    {/* eslint-disable-next-line*/ }
                                                    <a href = {value} target="_blank">{value}</a>
                                                </TableCell>                                            
                                            );
                                        }
                                        else return(
                                            <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                        )
                                        
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

/*
function PostMaitre() {
  return (
    <div className="PostMaitre">
      <h1>Hello there !</h1>
      {MaitreData.map((details,index)=>{
          return <h1>{details.name}</h1>
      })}
    </div>
  );
}*/

export default PostMaitre; 
