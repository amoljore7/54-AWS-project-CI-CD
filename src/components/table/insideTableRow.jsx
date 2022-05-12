import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@material-ui/core';

const InsideTableRow = ({ row = {}, tableHeader = [] }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {row?.policyName && (
                    <TableCell component="th" scope="row">
                        {row?.policyName}
                    </TableCell>
                )}
                {row?.section && <TableCell>{row?.section}</TableCell>}
                {row?.categories && <TableCell>{row?.categories}</TableCell>}
                {row?.newViolation && <TableCell>{row?.newViolation}</TableCell>}
                {row?.fixedViolation && <TableCell>{row?.fixedViolation}</TableCell>}
                {row?.existingViolation && <TableCell>{row?.existingViolation}</TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {tableHeader?.map((ele) => (
                                            <TableCell key={ele} style={{ color: '#505050' }}>
                                                {ele}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailsRow) => (
                                        <TableRow key={detailsRow.queueUrl}>
                                            {detailsRow?.queueUrl && (
                                                <TableCell component="th" scope="row" style={{ color: '#022D6D' }}>
                                                    {detailsRow?.queueUrl}
                                                </TableCell>
                                            )}
                                            {detailsRow?.arn && (
                                                <TableCell style={{ color: '#022D6D' }}>{detailsRow?.arn}</TableCell>
                                            )}
                                            {detailsRow?.encryption && (
                                                <TableCell style={{ color: '#022D6D' }}>
                                                    {detailsRow?.encryption}
                                                </TableCell>
                                            )}
                                            {detailsRow?.region && (
                                                <TableCell style={{ color: '#022D6D' }}>{detailsRow?.region}</TableCell>
                                            )}
                                            {detailsRow?.owner && (
                                                <TableCell style={{ color: '#022D6D' }}>{detailsRow?.owner}</TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

InsideTableRow.propTypes = {
    row: PropTypes.object,
    tableHeader: PropTypes.array,
};

export default InsideTableRow;
