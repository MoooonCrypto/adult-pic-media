export interface CategoryDescription {
  slug: string
  name: string
  description: string
}

export const categoryDescriptions: CategoryDescription[] = [
  {
    slug: 'gravure',
    name: 'グラビア',
    description: '雑誌の写真ページから発展した日本独自の文化。タレントやモデルの魅力的な写真を撮影し、主に週刊誌やフォトブックで公開されるジャンルです。美しいビジュアルと表現力で多くのファンを魅了しています。'
  },
  {
    slug: 'swimsuit',
    name: '水着',
    description: 'グラビア撮影の定番スタイル。ビーチやプールなど夏のシーンを彩る水着姿の魅力的な写真が中心です。一般の水着より小さめのグラビア専用水着を使用し、より洗練されたビジュアルを表現しています。'
  },
  {
    slug: 'stage-actress',
    name: '舞台女優',
    description: '演劇やミュージカルで活躍する女優たちの舞台写真。生のパフォーマンスを披露する舞台女優ならではの表現力と魅力を捉えた貴重な瞬間を収録しています。失敗が許されない緊張感の中で輝く姿をお楽しみください。'
  }
]

// カテゴリslugから説明を取得
export function getCategoryDescription(slug: string): string {
  const category = categoryDescriptions.find(cat => cat.slug === slug)
  return category?.description || `${slug}カテゴリーの投稿一覧です`
}

// すべてのカテゴリ説明をマップで取得
export function getCategoryDescriptionMap(): Record<string, string> {
  const map: Record<string, string> = {}
  categoryDescriptions.forEach(cat => {
    map[cat.slug] = cat.description
  })
  return map
}
