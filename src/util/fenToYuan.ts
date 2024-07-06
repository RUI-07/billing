export function fenToYuan(fen: number): string {
  const yuan = fen / 100
  const formattedYuan = yuan.toFixed(2)
  return formattedYuan.replace(/\.00$/, '')
}
