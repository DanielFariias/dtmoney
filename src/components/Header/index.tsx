import logoImg from '../../assets/logo.svg'
import * as C from './styles';

interface Props {
  onOpenNewTransactionModal: () => void
}

export const Header = ({ onOpenNewTransactionModal }: Props) => {

  return (
    <C.Container>
      <C.Content>
        <img src={logoImg} alt="dtmoney" />
        <button onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </C.Content>
    </C.Container>
  )

}