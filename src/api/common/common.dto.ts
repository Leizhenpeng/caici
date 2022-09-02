import { S } from 'unconfig/dist/types-6886c41e'

export class AllTopicResponse {
  id: number
  name: string
  nameShort: string
  nameCode: string
  wordLength: number

  constructor(id: number, name: string, nameShort: string, wordLength: number, nameCode: string) {
    this.id = id
    this.name = name
    this.nameShort = nameShort
    this.nameCode = nameCode
    this.wordLength = wordLength
  }
}

export class MetaBase {
  objectId?: string
  title?: string
  dynasty?: string
  authorName?: string
  authorId?: string
  kindCN?: string
  kind?: string
  layout?: string
  baiduWiki?: string
  content?: string
  translation?: string
  authorDesc?: string
  intro?: string
  annotation?: string
  masterComment?: string
  appreciation?: string
}
