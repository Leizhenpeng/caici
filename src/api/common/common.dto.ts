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

export class shiciWorkIdRequest {
  /**
   * 查询的语句
   * @example 我自横刀向天笑
   */
  sentence?: string

  /**
   * 古诗词的字数
   * @example 7
   */
  wordNum?: number
}

export class fetchShiciMetaResponse {
  ifOk?: boolean
  info?: string
  objectId?: string

  constructor(params: fetchShiciMetaResponse) {
    Object.assign(this, params)
  }
}

export class GetShiciDetailRequest {
  /**
   * workId:form 西窗烛
   * @example 57b8fafa8ac2470062df6cab
   */
  workId?: string
}

export class AuthorMeta {
  name?: string
  dynasty?: string
  desc?: string
}
export class FindShiciInfoReponse {
  objectId?: string
  title?: string
  dynasty?: string
  author?: AuthorMeta
  authorId?: string
  kindCN?: string
  kind?: string
  layout?: string
  baiduWiki?: string
  content?: string
  translation?: string
  intro?: string
  annotation?: string
  masterComment?: string
  appreciation?: string
}

