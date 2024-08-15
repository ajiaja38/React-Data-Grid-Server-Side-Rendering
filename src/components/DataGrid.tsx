import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UseUserPaginate, { RowsProps } from "../hooks/UseUserPaginate";

const DataGridComponents: React.FC = (): JSX.Element => {
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading } = UseUserPaginate({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });

  const column: GridColDef<RowsProps>[] = [
    {
      field: "no",
      headerName: "No",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
  ];

  return (
    <div className="flex flex-col w-full justify-center items-center p-3 gap-4">
      <h1 className="text-3xl font-bold text-blue-500">React Data Grid SSR</h1>
      <DataGrid
        rows={data?.rows || []}
        rowCount={data?.rowsCount || 0}
        columns={column}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        autoHeight
      />
    </div>
  );
};

export default DataGridComponents;
