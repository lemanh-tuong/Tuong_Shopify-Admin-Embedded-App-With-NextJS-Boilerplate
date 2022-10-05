import { promisify } from 'util';
import { CustomSessionStorage } from '@shopify/shopify-api/dist/auth/session';
import bluebird from 'bluebird';
import redis from 'redis';
import { REDIS_URL } from '../env';
import { reportService } from '../services/FirebaseSentryErrorService';
import { sessionStorageService } from '../services/NguyenDttnServices';

bluebird.promisifyAll(redis.RedisClient.prototype);

interface SessionStore {
  storeCallback: CustomSessionStorage['storeCallback'];
  loadCallback: CustomSessionStorage['loadCallback'];
  deleteCallback: CustomSessionStorage['deleteCallback'];
}

/** Dùng redis để lưu lại session */
class RedisStore implements SessionStore {
  client: redis.RedisClient;
  getAsync: (arg1: string) => Promise<string | null>;
  setAsync: (arg1: string, arg2: string) => Promise<boolean>;
  delAsync: (id: string) => Promise<boolean>;

  constructor({ redisURL }: { redisURL: string }) {
    // Create a new redis client
    this.client = redis.createClient(redisURL, {
      enable_offline_queue: true,
      no_ready_check: true,
      retry_strategy: options => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // Use Node's `promisify` to have redis return a promise from the client methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify<any, any, any>(this.client.set).bind(this.client);
    this.delAsync = promisify<any, any>(this.client.del).bind(this.client);
  }

  /*
    The storeCallback takes in the Session, and sets a stringified version of it on the redis store
    This callback is used for BOTH saving new Sessions and updating existing Sessions.
    If the session can be stored, return true
    Otherwise, return false
  */
  public storeCallback: SessionStore['storeCallback'] = async session => {
    try {
      // Inside our try, we use the `setAsync` method to save our session.
      // This method returns a boolean (true if successful, false if not)
      return await this.setAsync(session.id, JSON.stringify(session));
    } catch (err) {
      // throw errors, and handle them gracefully in your application
      reportService.createReportError({ error: err as Error, positionError: 'RedisStore -> storeCallback' });
      return false;
    }
  };

  /*
    The loadCallback takes in the id, and uses the getAsync method to access the session data
     If a stored session exists, it's parsed and returned
     Otherwise, return undefined
  */
  public loadCallback: SessionStore['loadCallback'] = async id => {
    try {
      // Inside our try, we use `getAsync` to access the method by id
      // If we receive data back, we parse and return it
      // If not, we return `undefined`
      const reply = await this.getAsync(id);
      if (reply) {
        return JSON.parse(reply);
      } else {
        throw new Error('No reply');
      }
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'RedisStore -> loadCallback' });
    }
  };

  /*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
  public deleteCallback: SessionStore['deleteCallback'] = async id => {
    try {
      // Inside our try, we use the `delAsync` method to delete our session.
      // This method returns a boolean (true if successful, false if not)
      return await this.delAsync(id);
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'RedisStore -> deleteCallback' });
      return false;
    }
  };
}

/** Dùng DB để lưu lại session */
class DBStore implements SessionStore {
  public storeCallback: SessionStore['storeCallback'] = async session => {
    return await sessionStorageService.setSessionStorage({ key: session.id, values: JSON.stringify(session) });
  };

  public loadCallback: SessionStore['loadCallback'] = async id => {
    return await sessionStorageService.getSessionStorage({ key: id });
  };

  public deleteCallback: SessionStore['deleteCallback'] = async id => {
    return await sessionStorageService.deleteSessionStorage({ key: id });
  };
}

/** Lưu ý có thể tự lưu vào db. Chi tiết đọc tại https://wilokesoftware.atlassian.net/wiki/spaces/SP/pages/396820492/Admin+embed */
export const sessionStorage = REDIS_URL ? new RedisStore({ redisURL: REDIS_URL }) : new DBStore();
