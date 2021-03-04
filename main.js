const faunadb = require('faunadb')
const q = faunadb.query;

module.exports = class FaunaService {
  constructor(faunaSecret) {
    this.serverClient = new faunadb.Client({secret: faunaSecret})
  }

  async createRecord(collectionName, data) {
    let record = await this.serverClient.query(
      q.Create(
        q.Collection(collectionName),
        { data }
      )
    )
    let recordData = record.data
    recordData.id = record.ref.id
    return recordData
  }

  async listRecords(collectionName) {
    try {
      let records = await this.serverClient.query(
        q.Map(
          q.Paginate(
            q.Documents(q.Collection(collectionName))),
            q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      let recordsData = []
      if(records && records.data && records.data.length > 0) {
        recordsData = records.data.map(el => {
          return {
            id: el.ref.id,
            ...el.data
          }
        })
      }
      return recordsData
    } catch (err) {
      console.error('FaunaService.listRecords:', err.toString())
    }
  }

  async getRecordById(collectionName, recordId) {
    try {
      const record = await this.serverClient.query(
        q.Get(
          q.Ref(
            q.Collection(collectionName), 
            recordId
          )
        )
      )
      
      let recordData = record.data
      recordData.id = record.ref.id
      return recordData
    } catch (err) {
      console.error('FaunaService.getRecordById:', err.toString())
    }
  }
  
  async deleteRecord(collectionName, recordId) {
    try {
      await this.serverClient.query(
        q.Delete(
          q.Ref(
            q.Collection(collectionName), 
            recordId
          )
        )
      )
    } catch (err) {
      console.error('FaunaService.deleteRecord:', err.toString())
    }
  }

  async updateRecord(collectionName, recordId, updates) {
    try {
      let updated = await this.serverClient.query(
        q.Update(
          q.Ref(
            q.Collection(collectionName), 
            recordId,
          ),
          {
            data: updates
          }
        )
      )
      let recordData = updated.data
      recordData.id = updated.ref.id
      return recordData
    } catch (err) {
      console.error('FaunaService.updateRecord:', err.toString())
    }
  }

  async getRecordByIndex(indexName, value) {
    try {
      let record = await this.serverClient.query(
        q.Get(
          q.Match(
            q.Index(indexName),
            value
          )
        )
      )
      let recordData = record.data
      recordData.id = record.ref.id
      return recordData
    } catch (err) {
      console.error('FaunaService.getRecordByIndex:', err.toString())
    }
  }

  async fetchRecordsInIndex(indexName) {
    try {
      let records = await this.serverClient.query(
        q.Map(
          q.Paginate(q.Match(q.Index(indexName))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      let recordsData = []
      if(records && records.data && records.data.length > 0) {
        recordsData = records.data.map(el => {
          return {
            id: el.ref.id,
            ...el.data
          }
        })
      }
      return recordsData
    } catch (err) {
      console.error('FaunaService.fetchRecordsInIndex:', err.toString())
    }
  }
}