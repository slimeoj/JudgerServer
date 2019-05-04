import {redis} from '../libs/redis'
import {redis_config} from "../config"

const Redis =  redis.getInstance(redis_config);
export default Redis
