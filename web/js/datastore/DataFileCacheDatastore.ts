import {Datastore, DatastoreID, ErrorListener, InitResult} from './Datastore';
import {FileRef} from './Datastore';
import {BinaryFileData} from './Datastore';
import {WriteFileOpts} from './Datastore';
import {isBinaryFileData} from './Datastore';
import {GetFileOpts} from './Datastore';
import {DocMetaRef} from './DocMetaRef';
import {DiskDatastore} from './DiskDatastore';
import {RemoteDatastore} from './RemoteDatastore';
import {Backend} from './Backend';
import {DocFileMeta} from './DocFileMeta';
import {Blobs} from '../util/Blobs';
import {Optional} from '../util/ts/Optional';
import {Logger} from '../logger/Logger';
import {DatastoreFileCache} from './DatastoreFileCache';
import {DelegatedDatastore} from './DelegatedDatastore';

const log = Logger.create();

/**
 * Basic delegated datastore so that we can resolve files form the local file
 * cache before going to the network version.
 */
export class DataFileCacheDatastore extends DelegatedDatastore {

    constructor(delegate: Datastore) {
        super(delegate);
    }

    public async getFile(backend: Backend, ref: FileRef, opts?: GetFileOpts): Promise<Optional<DocFileMeta>> {

        const hit = DatastoreFileCache.getFile(backend, ref);

        if (hit.isPresent()) {
            log.debug("Found file in datastore cache: ", {backend, ref});
            return hit;
        }

        return super.getFile(backend, ref, opts);

    }

}

