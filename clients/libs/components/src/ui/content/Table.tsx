/* eslint-disable react/jsx-key */
import React from "react";
import {
  useTable,
  useSortBy,
  useFlexLayout
} from "react-table";
import { Stack } from "@chakra-ui/react";
import styled, { css } from "styled-components";

import Pagination from "./Pagination";
import Icon from "./Icon";
import theme from "../base/theme";

// interface Columns {
//   accessor?: string;
//   Header: any;
//   Cell?: (arg0: any) => string | React.ReactElement | null;
//   className?: string;
//   bold?: boolean;
//   show?: boolean;
//   Column?: any;
//   columns?: Array<any>;
//   minWidth?: number;
//   width?: number;
//   collapse?: boolean;
// }

const StyledTh = styled.th<{ theme: any; backgroundColor: string }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: #a4a4a4;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  height: 40px;

  display: flex;
  align-items: center;

  /* Sticky */
  position: sticky !important;
  top: 0;
  background-color: ${(props) => props.backgroundColor};

  &.hide {
    display: none;
  }
`;

const StyledTd = styled.td<{ theme: any; bold?: boolean; hide?: boolean }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  line-height: 22px;
  color: ${(props) => props.theme.commons.dark};
  letter-spacing: normal;
  word-break: break-word;
  min-height: 60px;

  margin: 0;
  border-bottom: 1px solid #e5e5e5;

  display: flex;
  align-items: center;

  &.hide {
    display: none;
  }
`;

const StyledTr = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
  border-bottom: 1px solid #e5e5e5;
`;

const StyledTable = styled.table<{ backgroundColor: string; sticky: string }>`
  border-spacing: 0;
  border: 1px solid #e5e5e5;
  background-color: ${(props) => props.backgroundColor};
  width: 100%;

  thead {
    /* These styles are required for a scrollable body to align with the header properly */
    overflow-y: auto;
    overflow-x: hidden;
  }

  tbody {
    /* These styles are required for a scrollable table body */
    overflow-y: scroll;
    overflow-x: hidden;
    height: 250px;
  }

  th,
  td {
    margin: 0;
    padding-left: 20px;

    /* In this example we use an absolutely position resizer,
      so this is required. */
    position: relative;

    :last-child {
      border-right: 0;
    }
  }

  ${({ sticky }) =>
    sticky === "end" &&
    css`
      .sticky {
        right: 0;
      }
      tr:nth-child(2) {
        th:last-child {
          border-left: 1px solid #e5e5e5;
        }
      }
      tr {
        td:last-child {
          border-left: 1px solid #e5e5e5;
          padding-left: 0;
        }
      }
    `}

  ${({ sticky }) =>
    sticky === "start" &&
    css`
      .sticky {
        left: 0;
      }
      tr:nth-child(2) {
        th:last-child {
          border-right: 1px solid #e5e5e5;
        }
      }
      tr {
        td:last-child {
          border-right: 1px solid #e5e5e5;
        }
      }
    `}

  .sticky {
    position: sticky !important;
    top: 0;
    z-index: 1;
    background-color: ${(props) => props.backgroundColor};
  }
`;

const Main = styled.div`
  /* These styles are suggested for the table fill all available space in its containing element */
  display: block;
  /* These styles are required for a horizontaly scrollable table overflow */
  overflow: auto;
`;

type Props = {
  columns: any;
  data: Array<any>;
  backgroundColor: string;
  sticky?: "end" | "start";
  pagination?: {
    totalPages: number;
    goToPage: (page: number) => void;
    setPageSize: (arg0: number) => void;
    pageIndex: number;
    pageSize: number;
  };
};

function Table({
  columns,
  data,
  backgroundColor,
  sticky,
  pagination,
}: Props): React.ReactElement {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 300, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useSortBy,
      useFlexLayout
    );

  // Render the UI for your table
  return (
    <Stack spacing={4}>
      <Main>
        <StyledTable
          sticky={sticky as string}
          backgroundColor={backgroundColor}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <StyledTr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <StyledTh
                    {...column.getHeaderProps({
                      ...column.getSortByToggleProps(),
                      className: column.collapse
                        ? "collapse "
                        : "" + column.className || "",
                      style: column.style,
                    })}
                    theme={theme}
                    backgroundColor={backgroundColor}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "5px",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon name="ArrowDown" size="small" />
                          ) : (
                            <Icon name="ArrowUp" size="small" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </StyledTh>
                ))}
              </StyledTr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <StyledTr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <StyledTd
                      {...cell.getCellProps({
                        className: cell.column.className,
                        style: cell.column.style,
                        bold: cell.column.bold,
                      })}
                      theme={theme}
                    >
                      {cell.render("Cell")}
                    </StyledTd>
                  ))}
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      </Main>
      {pagination && (
        <Pagination
          goToPage={pagination.goToPage}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
          showMorePlacement="top"
        />
      )}
    </Stack>
  );
}

Table.defaultProps = {
  backgroundColor: "#fff",
};

export default Table;
