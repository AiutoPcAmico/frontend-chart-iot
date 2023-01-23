import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fetchData } from './getData';

const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'correctTemp', label: 'Temperature', minWidth: 100 },
    { id: 'correctHumi', label: 'Humidity', minWidth: 100 },
    { id: 'author', label: 'Author', minWidth: 100 },
    { id: 'sensor', label: 'Sensor', minWidth: 100 },

];

function formatDate(time) {
    var date = new Date(time)
    date.setHours(date.getHours() + 1);
    date = date.toISOString().slice(0, 19).replace('T', ' ')
    return date
}

function createData(timestamp, temperature, humidity, author, sensor) {
    const date = formatDate(timestamp);
    const correctTemp = temperature.toFixed(2) + " °C"
    const correctHumi = humidity.toFixed(0) + " %"
    return { date, correctTemp, correctHumi, author, sensor };
}



export function ListErrors() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const MINUTE_MS = 5000;


    function updateValue() {
        fetchData().then((response) => {
            var list = response.filter(single => single.value > 20)
            list = list.reverse().map((element) => {
                const formatted = createData(element.timestamp, element.value, element.hum, element.creatorMessage, element.sensorCode)
                return formatted;
            })
            setRows(list);
        })
        console.log("ricarico!")
    }


    React.useEffect(() => {
        updateValue()
    }, [])


    React.useEffect(() => {
        const interval = setInterval(() => {
            updateValue()

        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <p className='titols'>Lista Allarmi</p>
            <p><i>L'allarme è triggerato se la Temperatura &gt;20 °C</i></p>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={column.id === 'correctTemp' ? { color: 'red' } : { color: 'black' }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
