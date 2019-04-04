export class RecordService {


    constructor(dbClient) {
        this.dbClient = dbClient;
    }

    async storeRecord(userId, url) {
        const params = this.generateStoreArgs(userId, url);
        debugger;
        this.dbClient.putItem(...params, (err, data) => {
            if (err) throw err;
            return data;
        });
    }

    scanRecords(userId, url) {

    }

    generateStoreArgs(userId, url) {
        return [
            {
                Item: {
                    s3url: {
                        S: url
                    },
                    userId: {
                        S: userId
                    },
                },
                TableName: 's3Records',
                ReturnValues: 'ALL_NEW'
            }
        ];
    }
}