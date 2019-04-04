import {RecordService} from '../../src/services/record.service'
import {expect} from 'chai';

const sinon = require('sinon');

describe('record service', () => {

    let mockDB;
    let tableName;
    let service;

    beforeEach(() => {
        tableName = 'Foo';
        mockDB = {
            putItem: sinon.spy(),
        };
        service = new RecordService(mockDB);
    });

    context('#storeRecord', () => {

        it('puts an item on the database', async () => {
            await service.storeRecord('someUserId', 'https://example.com/fakeid');
            expect(mockDB.putItem.calledOnce).to.be.true
        });

        it('It records a s3 url with userId', async () => {
            const userId = 'someUserId';
            const url = 'https://example.com/fakeid';
            await service.storeRecord(userId, url);
            const args = service.generateStoreArgs(userId, url);
            expect(mockDB.putItem.withArgs(...args).called).to.be.true;
        });
    });
});