/** 
 * redis 的类
 * */
import * as Redis from 'ioredis'
import {JSON2STR,STR2JSON} from '../utils'

const debug = console.log


export interface IRedis {
}

interface IRedis_constructor {
    subscribe?: string ,
    publish?: string ,
    compile?: string ,
    judge?: string 
}

interface IMessage {
    [k: string]:any;
}

type Message = string | IMessage

export class redis {
    publish: Redis.Redis | undefined
    subscribe: Redis.Redis | undefined
    compile: Redis.Redis | undefined
    judge: Redis.Redis | undefined
    private static redis_ins :redis

    public static getInstance(con: IRedis_constructor):redis{
        if( ! redis.redis_ins)
            redis.redis_ins = new redis(con)
        return redis.redis_ins
    }

    constructor(con: IRedis_constructor) {
        /** 发布用的连接 */
        if (con.publish){
            this.publish = new Redis(con.publish)
            this.publish.on('connect',()=>{
                debug('publish connect success!')
            })
        }

        /** 订阅用的连接 */
        if(con.subscribe){
            this.subscribe = new Redis(con.subscribe)
            this.subscribe.on('connect',()=>{
                debug('subscribe connect success!')
            })
        }

        /** 编译队列用连接*/
        if( con.compile){
            this.compile = new Redis(con.compile)
        }

        /** 评测队列用连接 */
        if( con.judge)
            this.judge = new Redis( con.judge)
    }



    /** 监听信息 */
    listen_on_message(fn:any){
        /** 先订阅 */
        this.subscribe!.subscribe('publish_message',(err:any,count:number)=>{
            debug(`订阅成功 编号:${count}`)
        })
        this.subscribe!.on('message',fn)
    }

    /** 发布信息 */
    publish_message(message:Message):Promise<any>{
        if( typeof(message) === 'string')
            return this.publish!.publish('publish_message',<string>message)
        return this.publish!.publish('publish_message',JSON2STR(message))
    }

    /** 生产 */
    compile_push(data:Message){
        if( typeof(data) === 'string')
            return this.compile!.lpush('compile_queue',data)
        return this.compile!.lpush('compile_queue',JSON2STR(data))
    }

    /** 消费 */
    async compile_pop():Promise< JudgeServer.compile_type_data| null>{
        // @ts-ignore
        let res = await this.compile!.brpop('compile_queue',1)
        //debug("从compile队列取出的数据：")
        //debug(res)
        try {
            return <JudgeServer.compile_type_data>STR2JSON(res[1])
        }
        catch(e){
            return null
        }
    }

    /** 生产:评测队列 */
    judge_push(data:JudgeServer.compile_type_data):Promise<any>{
        return this.judge!.lpush('judge_queue',JSON2STR(data))
    }

    /** 消费:评测队列 */
    async judge_pop():Promise<JudgeServer.compile_type_data | null>{
        // @ts-ignore
        let res = await this.judge!.brpop('judge_queue',1)
        try{
            return <JudgeServer.compile_type_data>STR2JSON(res[1])
        }
        catch(e){
            return null
        }
    }
}
