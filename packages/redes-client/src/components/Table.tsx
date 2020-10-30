/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Table as TableContent } from "bonde-components"
import { useFilter } from "../services/FilterProvider"
import { Columns } from "../types";

type Props = {
  columns: Array<Columns>;
  data: Array<any>;
  backgroundColor: string;
  sticky?: "end" | "start";
  totalResults: number;
}

function Table({
  columns,
  data,
  totalResults,
  ...rest
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter()
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const total = Math.round(totalResults / state.rows);
    setTotalPages(total < 1 ? 1 : total)
  }, [totalResults])

  return (
    <TableContent
      data={React.useMemo(() => data, [state.page, state.rows])}
      columns={React.useMemo(() => columns, [])}
      pagination={{
        totalPages,
        goToPage: (e: number) => dispatch({ type: "page", value: e }),
        setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
        pageIndex: state.page,
        pageSize: state.rows,
      }}
      {...rest}
    />
  )
}

Table.defaultProps = {
  backgroundColor: "#fff",
};

export default Table;
