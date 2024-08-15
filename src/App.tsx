import React, { useEffect, useState } from "react";
import { api } from "./config";
import { ResponseEntity } from "./types/ResponseEntity.types";
import { UserProps } from "./types/User.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface RowsProps {
  no: number;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const App: React.FC = (): JSX.Element => {
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 5,
  });
  const [rows, setRows] = useState<RowsProps[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserPagination = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setIsLoading(true);

    try {
      const response: ResponseEntity<UserProps[]> = await api
        .get("user/pagination-public", {
          params: {
            page: page + 1,
            limit: pageSize,
          },
        })
        .then((res) => res.data);

      setRows(
        response.data.map((row: UserProps, index: number) => {
          return {
            no: page * pageSize + index + 1,
            id: row.guid,
            name: row.name,
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
          };
        })
      );
      setRowCount(response.meta?.totalData || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const column: GridColDef<(typeof rows)[number]>[] = [
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

  useEffect(() => {
    getUserPagination(paginationModel);
  }, [paginationModel]);

  return (
    <div className="flex flex-col w-full justify-center items-center p-3 gap-4">
      <h1 className="text-3xl font-bold text-blue-500">React Data Grid SSR</h1>
      <DataGrid
        rows={rows}
        rowCount={rowCount}
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

export default App;
