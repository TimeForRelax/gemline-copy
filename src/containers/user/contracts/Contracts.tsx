import { useContracts } from '@api/index';
import { Footer } from '@components/index';
import { ContentWrapper, Heading, Wrapper } from '@containers/common/styles';
import { FC, useState } from 'react';
import { ContractsInformation } from './components/contractsInformation/ContractsInformation';
import { FinancialSummaryBlocks } from './components/financialSummaryBlocks/FinancialSummaryBlocks';
import { ContractsStatusToggleButtons } from './components/сontractsStatusToggleButtons/ContractsStatusToggleButtons';

interface ContractsProps {}

export const Contracts: FC<ContractsProps> = () => {
  const [alignment, setAlignment] = useState<string>('active');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const { data: contractsData, isSuccess: isContractsSuccess, isError: isContractsError } = useContracts();

  if (!isContractsSuccess || isContractsError) return;

  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Мои контракты</Heading>
        <ContractsStatusToggleButtons alignment={alignment} handleChange={handleChange} />
        <FinancialSummaryBlocks summary={contractsData.data[alignment].summary} />
        <ContractsInformation alignment={alignment} contracts={contractsData.data[alignment].contracts} />
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
