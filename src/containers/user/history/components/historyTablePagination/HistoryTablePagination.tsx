import { FC } from 'react';
import styled from '@emotion/styled';
import { Box, Pagination } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { Buttons } from '@components/index';
import { ButtonsTypes } from '@enums/index';

const PaginationBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phone} {
    align-items: flex-start;
  }
`;

const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: ${colorFetch('gray')};
    font-family: Gilroy600;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    border-radius: 20px;

    &:hover {
      color: ${colorFetch('green')};
      background-color: ${colorFetch('white')};
    }

    &.Mui-selected {
      color: ${colorFetch('green')};
      background-color: transparent;
      pointer-events: none;

      &:hover {
        color: ${colorFetch('green')};
        background-color: transparent;
      }
    }

    ${media.phone} {
      font-size: 12px;
    }
  }

  .MuiPagination-ul {
    justify-content: center;
  }
`;

const StyledButton = styled(Buttons)`
  width: max-content;
  padding: 8px 12px;
  font-weight: 600;

  &:disabled {
    color: ${colorFetch('gray1')};
    background-color: ${colorFetch('white')};
  }

  ${media.phone} {
    font-size: 12px;
    padding: 8px;
  }
`;

interface HistoryTablePaginationProps {
  page: number;
  setPage: any;
  countPages: number;
}

export const HistoryTablePagination: FC<HistoryTablePaginationProps> = ({ page, setPage, countPages }) => {
  const onPaginationChange = (event, page) => {
    setPage(page);
  };

  const onBackPaginationClick = () => {
    if (page - 1 === 0) return;
    setPage((prevPage) => prevPage - 1);
  };

  const onNextPaginationClick = () => {
    if (page + 1 > countPages) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <PaginationBox>
      <StyledButton buttonType={ButtonsTypes.CONTAINED_WHITE} onClick={onBackPaginationClick} disabled={page - 1 === 0}>
        Назад
      </StyledButton>
      <StyledPagination
        page={page}
        count={countPages}
        hidePrevButton
        hideNextButton
        shape={'rounded'}
        boundaryCount={1}
        siblingCount={1}
        onChange={onPaginationChange}
        variant={'text'}
      />
      <StyledButton
        buttonType={ButtonsTypes.CONTAINED_WHITE}
        onClick={onNextPaginationClick}
        disabled={page + 1 > countPages}
      >
        Вперед
      </StyledButton>
    </PaginationBox>
  );
};
