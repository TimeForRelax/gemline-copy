import { useHistory } from '@api/history/getUserActionsHistory';
import { Footer } from '@components/index';
import { ContentWrapper, Heading, Wrapper } from '@containers/common/styles';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { HistoryDateRangePicker } from './components/historyDateRangePicker/HistoryDateRangePicker';
import { HistoryFilterSelect } from './components/historyFilterSelect/HistoryFilterSelect';
import { HistoryInfo } from './components/historyInfo/HistoryInfo';
import { HistoryTable } from './components/historyTable/HistoryTable';
import { HistoryTablePagination } from './components/historyTablePagination/HistoryTablePagination';

const RangeAndSelectorPanelBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
  margin-bottom: 40px;

  ${media.tabletPro} {
    grid-template-columns: repeat(1, auto);
  }
`;

const NoTransctionsBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 30px;
  border-radius: 12px;
  border: 1px solid ${colorFetch('border')};
`;

const NoTransctionsText = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  opacity: 0.4;
`;

const HistoryNoTransctions = () => {
  return (
    <NoTransctionsBox>
      <NoTransctionsText>Нет транзакций</NoTransctionsText>
    </NoTransctionsBox>
  );
};

interface HistoryProps {}

export const History: FC<HistoryProps> = () => {
  const { data: convertedData, isSuccess: isHistorySuccess, isError: isHistoryError } = useHistory();

  const [reward, setReward] = useState('0');
  const [startDate, setStartDate] = useState<any>(dayjs(new Date()).add(-1, 'month').startOf('month'));
  const [endDate, setEndDate] = useState<any>(dayjs(new Date()));
  const [filteredRows, setFilteredRows] = useState<any>([]);
  const [rowsCopy, setRows] = useState([...filteredRows].slice(0, 5));
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const countPages = Math.ceil(filteredRows.length / itemsPerPage);

  useEffect(() => {
    const filterByDateRange = () => {
      let filteredArr: any = [];
      convertedData.rows.forEach((el: any) => {
        const dateAndTime = dayjs(el.dateAndTime, 'DD.MM.YYYY').startOf('day');
        const startDateDayJs = dayjs(startDate).startOf('day');
        const endDateDayJs = dayjs(endDate).endOf('day');
        if (dateAndTime >= startDateDayJs && dateAndTime <= endDateDayJs) filteredArr.push(el);
      });

      if (reward !== '0') {
        filteredArr = filteredArr.filter((el: any) => el.action === reward);
      }

      setFilteredRows(filteredArr);
      setPage(1);
    };

    if (convertedData?.rows?.length > 0) filterByDateRange();
  }, [startDate, endDate, reward, convertedData?.rows]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRows([...filteredRows].slice(startIndex, endIndex));
  }, [page, filteredRows]);

  if (!isHistorySuccess || isHistoryError) return;

  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>История</Heading>
        <HistoryInfo profit={convertedData?.calculatedProfit} />
        <RangeAndSelectorPanelBox>
          <HistoryDateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <HistoryFilterSelect reward={reward} setReward={setReward} />
        </RangeAndSelectorPanelBox>
        {!rowsCopy.length ? (
          <HistoryNoTransctions />
        ) : (
          <>
            <HistoryTable rowsCopy={rowsCopy} />
            <HistoryTablePagination page={page} setPage={setPage} countPages={countPages} />
          </>
        )}
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
