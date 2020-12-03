# FaunaService

FaunaService is a small wrapper around basic CRUD operations for FaunaDB. It makes performing these simple operations extremely easy and intuitive. 

Note: This library is provided with absolutely no guarantees from myself or any contributors.

## How to Use

### Install the Package

```
npm install @brianmmdev/faunaservice
```

### Creating the Service Instance

The service is exported as a class, so you'll need to create an instance to use it. Pass in your Fauna secret for your database.

```js
// Import the library
const FaunaService = require('@brianmmdev/faunaservice')

// New up an instance, passing in your Fauna secret
const _faunaService = new FaunaService('MY_FAUNA_SECRET')
```

### Adding a Record

```js
let myData = {
  firstName: 'Brian',
  lastName: 'Morrison'
}

let createdRecord = await _faunaService.createRecord('COLLECTION_NAME', myData);

// Returns:
// {
//   id: '123123123123', // This is the ref id
//   firstName: 'Brian',
//   lastName: 'Morrison'
// }
```

### Update a Record

Updating a record will only update the specific values passed in.

```js
let recordId = '123123123123'
let myUpdates = {
  firstName: 'Luca'
}

let updatedRecord = await _faunaService.updateRecord('COLLECTION_NAME', recordId, myUpdates)

// Returns:
// {
//   id: '123123123123',
//   firstName: 'Luca',
//   lastName: 'Morrison'
// }
```

### Get a Single Record

Fetching a record requires an index to be created with one field to query on. The result will be a flattened version of the record (meaning the Ref ID will be returned as `id` in the data)

```js
let queriedValue = 'someValue'

let record = await _faunaService.getRecordByIndex('INDEX_NAME', queriedValue)

// Returns:
// {
//   id: '123123123123',
//   firstName: 'Luca',
//   lastName: 'Morrison'
// }
```

### Fetch Records From an Index

Fetching multiple records requires an index with no queryable fields to be defined. The result will be an array of flattened records, same as above.

```js
let records = await _faunaService.fetchRecordsInIndex('INDEX_NAME')

// Returns:
// [{
//   id: '123123123123',
//   firstName: 'Luca',
//   lastName: 'Morrison'
// }]
```

### Delete a Record

Deleting a record will not return any values.

```js
let recordId = '123123123123'
await _faunaService.deleteRecord('COLLECTION_NAME', recordId)
```

## Contributing

To contribute, follow standard GitHub contribution guidelines:

1. Fork the repo
2. Make changes
3. Create a pull request.
4. ???
5. Profit! (Not really...)

## Support

If you have questions, the best way to contact me is through my Discord, [fullstack.chat](https://fullstack.chat)


