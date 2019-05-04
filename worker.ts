/** 消费者 */
import Redis from './application/redis'
const debug = console.log

async function main(){
    while(1){
        debug(' === 正在取出compile队列数据')
        let data:JudgeServer.compile_type_data | null = await Redis.compile_pop()
        if( data){
            debug(' === 取出数据成功')
            debug(data)
        }
        else
            debug("没有数据")
    }
}

main()


