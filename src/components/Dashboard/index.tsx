import Summary from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import * as C from './styles';

export const Dashboard: React.FC = () => {
  return (
    <C.Container>
      <Summary />
      <TransactionsTable />
    </C.Container>
  )
}
