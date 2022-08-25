export class AllTopicResponse {
  id: number
  name: string
  nameShort: string
  wordLength: number

  constructor(id: number, name: string, nameShort: string, wordLength: number) {
    this.id = id
    this.name = name
    this.nameShort = nameShort
    this.wordLength = wordLength
  }
}
