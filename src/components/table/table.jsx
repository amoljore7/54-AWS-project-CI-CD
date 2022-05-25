import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchBar from 'material-ui-search-bar';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    tableHead: {
        backgroundColor: '#044AB2',
    },

    tableHeading: {
        color: '#FFFFFF !important',
        fontSize: '16px !important',
    },
    searchBarWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    searchBar: {
        marginBottom: '20px',
        backgroundColor: '#E8F1FF',
        width: '329px',
    },
}));

const CollapsibleTable = ({ TableDataObject = {} }) => {
    const classes = useStyles();
    const [rows, setRows] = useState(TableDataObject?.originalRows);
    const [searched, setSearched] = useState('');
    var keysData = [];

    useLayoutEffect(() => {
        setRows(TableDataObject?.originalRows);
    }, [TableDataObject?.originalRows]);

    if (rows[0] && rows[0]) {
        keysData = Object.keys(rows[0] && rows[0]);
    }

    //For static search
    const originalRows = TableDataObject?.originalRows;
    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row['Bucket Name'].toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched('');
        requestSearch(searched);
    };
    return (
        <>
            <div className={classes.searchBarWrapper}>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder={TableDataObject?.searchPlaceholder}
                    className={classes.searchBar}
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                            {TableDataObject?.tableHeader.map((ele) => (
                                <TableCell key={ele} className={classes.tableHeading}>
                                    {ele}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows &&
                            rows?.map((row) => (
                                <TableRow key={row}>
                                    {keysData?.map((elementKey, index) => (
                                        <TableCell key={index}>{row[elementKey]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

CollapsibleTable.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    TableDataObject: PropTypes.object,
};
export default CollapsibleTable;
