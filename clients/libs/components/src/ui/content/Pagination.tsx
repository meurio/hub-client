import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Stack, Button } from "@chakra-ui/react";
import RoundSelect from "../form/RoundSelect";
import theme from "../base/theme";

type Props = {
  goToPage: (arg: number) => void;
  pageIndex: number;
  pageSize: number;
  setPageSize: (arg: number) => void;
  totalPages: number;
  showMorePlacement?: "auto" | "top" | "bottom";
};

const WrapSelect = styled.div<{ theme: any }>`
  width: 150px;
  & .Select__control {
    border-color: ${({ theme }) => theme.brand.dark};
    &:hover {
      border-color: ${({ theme }) => theme.commons.dark};
    }
    &:focus {
      border-color: ${({ theme }) => theme.dark.border.focus};
    }
  }
  & .Select__single-value {
    color: ${({ theme }) => theme.brand.dark};
    &:hover {
      color: ${({ theme }) => theme.commons.dark};
    }
    &:focus {
      color: ${({ theme }) => theme.dark.border.focus};
    }
  }
  .Select__indicators svg path {
    fill: ${({ theme }) => theme.brand.dark};
    &:hover {
      fill: ${({ theme }) => theme.commons.dark};
    }
    &:focus {
      fill: ${({ theme }) => theme.dark.border.focus};
    }
  }
`;

WrapSelect.defaultProps = {
  theme,
};

const getItems = (page: number, totalPages: number) => {
  let startPage: number, endPage: number;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (page <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (page + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = page - 5;
      endPage = page + 4;
    }
  }

  // create an array of pages to ng-repeat in the pager control
  return Array.from(Array(endPage + 1 - startPage), (_, i) => startPage + i);
};

const Pagination = ({
  goToPage,
  pageIndex,
  pageSize,
  totalPages,
  setPageSize,
  showMorePlacement,
}: Props): React.ReactElement => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(getItems(pageIndex, totalPages));
  }, [pageIndex, totalPages]);

  const setPage = (page: number) => {
    const items = getItems(page, totalPages);
    setItems(items);
    return goToPage(page);
  };

  return (
    <Stack direction="row" my={4} spacing={2} justify="center">
      <Button
        variant="link"
        colorScheme="gray"
        onClick={() => setPage(0)}
        disabled={pageIndex === 0}
      >
        {"<<"}
      </Button>{" "}
      <Button
        variant="link"
        colorScheme="gray"
        onClick={() => setPage(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        anterior
      </Button>{" "}
      <Stack direction="row" spacing={2}>
        {items.map((item: number, i: number) => (
          <Button
            key={`page-item-${i}`}
            variant="link"
            colorScheme="gray"
            color={item - 1 === pageIndex ? "pink.200" : "gray.300"}
            onClick={() => setPage(item - 1)}
          >
            {item}
          </Button>
        ))}
      </Stack>
      <Button
        variant="link"
        colorScheme="gray"
        onClick={() => setPage(pageIndex + 1)}
        disabled={pageIndex === totalPages - 1}
      >
        próxima
      </Button>{" "}
      <Button
        variant="link"
        colorScheme="gray"
        onClick={() => setPage(totalPages - 1)}
        disabled={pageIndex === totalPages - 1}
      >
        {">>"}
      </Button>{" "}
      <WrapSelect>
        <RoundSelect
          options={[
            {
              value: 10,
              label: "Mostrar 10",
            },
            {
              value: 20,
              label: "Mostrar 20",
            },
            {
              value: 30,
              label: "Mostrar 30",
            },
            {
              value: 40,
              label: "Mostrar 40",
            },
            {
              value: 50,
              label: "Mostrar 50",
            },
          ]}
          placeholder=""
          value={{
            value: pageSize,
            label: `Mostrar ${pageSize}`,
          }}
          onChange={(e) => setPageSize(Number(e.value))}
          menuPortalTarget={document.querySelector("body")}
          menuPlacement={showMorePlacement}
        />
      </WrapSelect>
    </Stack>
  );
};

export default Pagination;
