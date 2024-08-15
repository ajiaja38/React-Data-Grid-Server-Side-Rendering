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
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [rows, setRows] = useState<RowsProps[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserPagination = async (page: number, limit: number) => {
    setIsLoading(true);

    try {
      const response: ResponseEntity<UserProps[]> = await api
        .get("user/pagination-public", {
          params: {
            page,
            limit,
          },
        })
        .then((res) => res.data);

      setRows(
        response.data.map((row: UserProps, index: number) => {
          return {
            no: (page - 1) * limit + index + 1,
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
    getUserPagination(page, limit);
  }, [page, limit]);

  return (
    <div className="flex flex-col w-full justify-center items-center p-3 gap-4">
      <h1 className="text-3xl font-bold text-blue-500">React Data Grid SSR</h1>
      <DataGrid
        rows={rows}
        columns={column}
        initialState={{
          pagination: {
            paginationModel: {
              page: page,
              pageSize: limit,
            },
          },
        }}
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[5, 10]}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setLimit(pageSize);
        }}
        loading={isLoading}
        autoHeight
      />
    </div>
  );
};

export default App;
