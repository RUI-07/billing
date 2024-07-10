import {Button, Flex, Space} from 'react-vant'
import Styles from './index.module.css'
import {BillTableColumn, BillTableRecord} from './type'
import {Cross} from '@react-vant/icons'
import classnames from 'classnames'
import {add} from 'lodash'
import {WritableDraft, produce} from 'immer'
export type {BillTableRecord} from './type'

const columns: BillTableColumn[] = [
  {
    key: 'name',
    title: '商品',
  },
  {
    key: 'quantity',
    title: '数量',
  },
  {
    key: 'price',
    title: '单价',
  },
  {
    key: 'total',
    title: '结算',
  },
  {
    key: 'remove',
    title: '移除',
  },
]

export const createBillTableRow = (): BillTableRecord => {
  return {
    name: '',
    quantity: '',
    price: '',
  }
}

export interface BillTableProps {
  editable?: boolean
  value?: BillTableRecord[]
  onChange?: (value: BillTableRecord[]) => void
}
export const BillTable = (props: BillTableProps) => {
  const {value = [], onChange, editable} = props

  const handleChange = (setter: (draft: WritableDraft<BillTableRecord[]>) => void) => {
    onChange?.(produce(value, setter))
  }

  const handleAddRow = () => {
    handleChange(draft => {
      draft.push(createBillTableRow())
    })
  }

  const handleEmptyTable = () => {
    onChange?.([createBillTableRow()])
  }

  const handleRemoveRow = (rowIndex: number) => {
    handleChange(draft => {
      draft.splice(rowIndex, 1)
      if (draft.length < 1) {
        draft.push(createBillTableRow())
      }
    })
  }

  function renderContent<T extends keyof BillTableRecord>(params: {
    rowIndex: number
    key: T
    value: BillTableRecord[T]
    record: BillTableRecord
  }) {
    const {key, value, rowIndex, record} = params
    switch (key) {
      case 'remove': {
        return (
          <div
            className={classnames(Styles.content, Styles.remove)}
            onClick={() => {
              handleRemoveRow(rowIndex)
            }}
          >
            <Cross />
          </div>
        )
      }
      case 'total': {
        return <div className={Styles.content}>{+record.price * +record.quantity}</div>
      }
      default: {
        return (
          <div className={Styles.content}>
            {editable ? (
              <input
                className={Styles.input}
                value={value}
                onChange={e => {
                  handleChange(draft => {
                    draft[rowIndex][key] = e.target.value as BillTableRecord[T]
                  })
                }}
              />
            ) : (
              <span>{value}</span>
            )}
          </div>
        )
      }
    }
  }

  const finalColumns = editable
    ? columns
    : columns.filter(item => {
        return !['remove'].includes(item.key)
      })

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <table className={Styles.table}>
        <thead>
          <tr>
            {finalColumns.map(item => (
              <th key={item.key}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => {
            return (
              <tr key={index}>
                {finalColumns.map(({key}) => {
                  return (
                    <td key={key}>
                      <div className={Styles.content}>
                        {renderContent({rowIndex: index, key, value: item[key], record: item})}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Flex justify="between" align="center">
        {editable ? (
          <Space>
            <Button size="small" type="primary" onClick={handleAddRow}>
              添加
            </Button>
            <Button size="small" type="danger" onClick={handleEmptyTable}>
              清空
            </Button>
          </Space>
        ) : (
          <span />
        )}
        <span className={Styles.total}>
          ¥{value.map(item => parseFloat(item.price) * parseFloat(item.quantity)).reduce(add, 0) || 0}
        </span>
      </Flex>
    </Space>
  )
}
