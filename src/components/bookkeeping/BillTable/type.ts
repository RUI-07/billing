export interface BillTableRecord {
  name: string
  quantity: string
  price: string
  total?: undefined
  remove?: undefined
}

export interface BillTableColumn {
  key: keyof BillTableRecord
  title: string
}
