import React, { FC, useEffect, useState } from 'react'
import {
  Layout,
  PageBlock,
  Table,
  ToastProvider,
  ToastConsumer,
} from 'vtex.styleguide'
import { tableSchema } from './utils/tableSchema'
import { getData, updateComboAvailability } from './services/api'

interface Combo {
  amount: number
  items: string[]
  id: string
  comboId: string
  comboProductId: string
  prodOneId: number
  prodOneName: string
  prodTwoId: number
  prodTwoName: string
  available: boolean
  message: string
}

const AdminCombo: FC = () => {
  const [loading, setLoading] = useState(true)
  const [combinations, setCombinations] = useState<Combo[]>([])
  const [error, setError] = useState(false)

  const bootstrap = async () => {
    const data = await getData();
    if (data === 'SERVER ERROR') {
      setError(true)
    } else {
      data.map((combo: Combo) => {
        combo.comboId = combo.id;
        combo.message = combo.available ? 'Ativado' : 'Desativado';
      })
      setCombinations(data);
    }
    setLoading(false);
  }

  const handleUpdate = async (combos: Combo[], showToast: (message: string) => void) => {
    const combosId = combos.map(combo => combo.comboId);
    setLoading(true);
    await updateComboAvailability(combosId)
      .then(() => {
        showToast("Combo(s) Atualizado(s) com sucesso!");
      })
      .catch(() => {
        setError(true);
        showToast("Erro: Não foi possível atualizar o(s) combo(s) no momento!");
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    bootstrap();
  }, [loading])


  if (error) {
    return (
      <Layout>
        <PageBlock title="Combos" variation="full">
          <div className="error">
            <h1>Algo inesperado aconteceu, tente novamente</h1>
          </div>
        </PageBlock>
      </Layout>
    )
  }

  return (
    <ToastProvider positioning="window">
      <Layout>
        <ToastConsumer>
          {({ showToast }: any) => (
            <PageBlock
              title="Combos"
              subtitle="Lista de combos"
              variation="full"
            >
              <Table
                schema={tableSchema}
                items={combinations}
                loading={loading}
                density="high"
                emptyStateLabel="Não existem combos cadastrados!"
                bulkActions={{
                  onChange: () => {},
                  main: {
                    label: 'Ativar/Desativar Combo(s) Selecionado(s)',
                    handleCallback: (params: any) => {
                     handleUpdate(params.selectedRows, showToast)
                    },
                  },
                }}
              />
            </PageBlock>
          )}
        </ToastConsumer>
      </Layout>
    </ToastProvider>
  )
}
export default AdminCombo
