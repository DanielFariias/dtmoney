import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface transaction {
  id: number,
  title: string,
  type: string,
  amount: number,
  category: string,
  createdAt: string;
}

type transactionInput = Omit<transaction, 'id' | 'createdAt'>
// type transactionInput = Pick<transaction, 'title' | 'type' | 'amount' | 'category'>

interface TransactionsContextData {
  transactions: transaction[]
  createTransaction: (transaction: transactionInput) => Promise<void>
}

interface Props {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(res => setTransactions(res.data.transactions))
  }, [])

  const createTransaction = async (transactionInput: transactionInput) => {
    await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
      .then(response => {
        const { transaction } = response.data
        setTransactions(state => ([...state, transaction]))
      })
      .catch(err => console.error(err))
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}