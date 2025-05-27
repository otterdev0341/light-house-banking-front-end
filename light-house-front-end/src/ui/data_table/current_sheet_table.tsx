import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import type { ResCurrentSheetDto } from "../../domain/dto/current_sheet_dto";

interface CurrentSheetTableProps {
    data: ResCurrentSheetDto[];
}

const CurrentSheetTable: React.FC<CurrentSheetTableProps> = ({ data }) => {
    

    const formatBalance = (balance: number): string => {
        return balance.toFixed(2); // Ensure 2 decimal places
    };

    return (
        <TableContainer
            component={Paper}
            style={{ maxHeight: 700, overflow: "auto" }} // Set max height and enable scrolling
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Asset Name</TableCell>
                        <TableCell align="center">Balance</TableCell>
                        <TableCell align="center">Last Transaction ID</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{row.asset_name}</TableCell>
                            <TableCell align="center">
                                {row.balance < 0
                                    ? `(${formatBalance(Math.abs(row.balance))})` // Format negative values with parentheses
                                    : formatBalance(row.balance)} 
                            </TableCell>
                            <TableCell align="center">
                                {row.last_transaction_id || "-"}
                            </TableCell>
                            <TableCell align="center">
                                {dayjs(row.updated_at)
                                    .tz("Asia/Bangkok")
                                    .format("YYYY-MM-DD HH:mm:ss")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CurrentSheetTable;