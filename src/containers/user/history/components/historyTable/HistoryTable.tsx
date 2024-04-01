import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';
import { selectOptions } from '../../data/data';

const HistoryTableBox = styled(Box)`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 5px;
  margin-bottom: 12px;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colorFetch('gray1')};
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colorFetch('gray')};
    border-radius: 15px;
  }
`;

const StyledTable = styled(Table)`
  min-width: 900px;

  ${media.tabletPro} {
    min-width: 600px;
  }
`;

const StyledTableHeadCell = styled(TableCell)`
  border-bottom: none;
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  padding: 0 20px 12px 20px;

  ${media.tabletPro} {
    font-size: 12px;
    padding: 0 10px 12px 10px;
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${colorFetch('white')};
  tr {
    td {
      &.last {
        &:before {
          width: calc(100% - 40px);

          ${media.tabletPro} {
            width: calc(100% - 20px);
          }
        }
      }
    }
  }
`;

const StyledBodyTableRow = styled(TableRow)`
  td {
    padding: 12px 20px;
    border: 0;
    position: relative;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: ${colorFetch('border1')};
      bottom: 0;
    }

    ${media.tabletPro} {
      padding: 12px 10px 8px 10px;
    }
  }

  &:last-child td {
    border: 0;
    padding: 12px 20px 20px 20px;

    ${media.tabletPro} {
      padding: 12px 10px 12px 10px;
    }

    &:before {
      display: none;
    }

    &.first {
      border-radius: 0 0 0 24px;
    }

    &.last {
      border-radius: 0 0 24px 0;
    }
  }

  &:first-child td {
    padding: 20px 20px 12px 20px;

    &.one {
      padding: 20px;
    }

    ${media.tabletPro} {
      padding: 12px 10px 8px 10px;
    }

    &.first {
      border-radius: 24px 0 0 0;

      &.one {
        border-radius: 24px 0 0 24px;
      }
    }

    &.last {
      border-radius: 0 24px 0 0;

      &.one {
        border-radius: 0 24px 24px 0;
      }
    }
  }
`;

const StyledTableBodyCell = styled(TableCell)`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;

  &.money {
    font-family: Gilroy600;
    font-weight: 600;
  }

  ${media.tabletPro} {
    font-size: 12px;
  }
`;

interface HistoryTableProps {
  rowsCopy: Record<string, string>[];
}

export const HistoryTable: FC<HistoryTableProps> = ({ rowsCopy }) => {
  const isCorrectBorder = rowsCopy.length === 1;

  return (
    <HistoryTableBox>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>ID транзакции</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Дата и время</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Действие</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Сумма</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Баланс</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <StyledTableBody>
          {rowsCopy.map((row) => (
            <StyledBodyTableRow key={row.transactionId}>
              <StyledTableBodyCell align="left" className={`first ${isCorrectBorder ? 'one' : ''}`}>
                # {row.transactionId}
              </StyledTableBodyCell>
              <StyledTableBodyCell align="left" className={isCorrectBorder ? 'one' : ''}>
                {row.dateAndTime}
              </StyledTableBodyCell>
              <StyledTableBodyCell align="left" className={isCorrectBorder ? 'one' : ''}>
                {selectOptions[row.action]}
              </StyledTableBodyCell>
              <StyledTableBodyCell align="left" className={`money ${isCorrectBorder ? 'one' : ''}`}>
                {row.sum}
              </StyledTableBodyCell>
              <StyledTableBodyCell align="left" className={`last money ${isCorrectBorder ? 'one' : ''}`}>
                {row.balance}
              </StyledTableBodyCell>
            </StyledBodyTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </HistoryTableBox>
  );
};
