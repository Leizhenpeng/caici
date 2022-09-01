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
