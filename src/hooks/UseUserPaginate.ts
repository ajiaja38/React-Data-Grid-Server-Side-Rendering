import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { ResponseEntity } from "../types/ResponseEntity.types";
import { api } from "../config";
import { UserProps } from "../types/User.types";

interface UseUserPaginateProps {
  limit: number;
  page: number;
}

export interface RowsProps {
  no: number;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const UseUserPaginate = ({
  limit,
  page,
}: UseUserPaginateProps): UseQueryResult<
  {
    rows: RowsProps[];
    rowsCount: number;
  },
  Error
> => {
  const getUsersPaginate = async (
    page: number,
    limit: number
  ): Promise<{
    rows: RowsProps[];
    rowsCount: number;
  }> => {
    const response: ResponseEntity<UserProps[]> = await api
      .get("user/pagination-public", {
        params: {
          page: page + 1,
          limit,
        },
      })
      .then((res) => res.data);

    const rows: RowsProps[] = response.data.map(
      (row: UserProps, index: number) => {
        return {
          no: page * limit + index + 1,
          id: row.guid,
          name: row.name,
          email: row.email,
          phoneNumber: row.phoneNumber,
          address: row.address,
        };
      }
    );

    return {
      rows,
      rowsCount: response.meta?.totalData || 0,
    };
  };

  const query: UseQueryResult<
    {
      rows: RowsProps[];
      rowsCount: number;
    },
    Error
  > = useQuery({
    queryKey: ["users", limit, page],
    queryFn: () => getUsersPaginate(page, limit),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default UseUserPaginate;
