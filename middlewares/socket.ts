/// <reference types="socket.io" />
import  * as socket from 'socket.io'
import { default_judge_argment } from '../env/index'
import * as util from 'util'

const { lang: dlang, memory: dmemory, time: dtime, stack: dstack, spj: dspj } = default_judge_argment

function validata(data: JudgeServer.postJudgeData):JudgeServer.postJudgeData {

    let { id, lang = dlang, code, memory = dmemory, time = dtime, stack = dstack, spj= dspj } = data


    if (!id) throw ('没有参数:id为空')
    if (!code) throw ('没有代码:code')

    if (util.isString(id) || util.isNumber(id))
        id += ''
    else
        throw ('参数[ id ]的格式错误,必须为number或者string')

    const support_lang = ['c++']
    if( lang.toLowerCase() == 'cpp')
        lang = 'c++'

    if (support_lang.indexOf(lang) == -1) {
        throw (`不支持的语言:${lang},本Judge支持的语言为${support_lang.join(',')}`)
    }

    let code_min_len:number = 10
    let code_max_len:number = 1000000
    if(code.length < code_min_len || code.length > code_max_len){
        throw(`参数[ code ]的长度太短或太长`)
    }

    return { id,lang,code,memory,time,stack,spj }

}

/** 处理的评测的数据 */
function judge(this:socket.Socket,data: JudgeServer.postJudgeData) {
    console.log("==========================================")
    console.log(arguments)

    /** 数据验证 */

    try {
        let verfied_data = validata(data)
        let __data:JudgeServer.compile_type_data = {
            type:'compile',
            socket_client_id:this.id,
            raw:verfied_data
        }
        let tm = JSON.stringify(__data)

        /** 加入队列 */
        console.log(tm)
        /** 发布消息 */
    }
    catch (e) {
        /** 发布消息 */
        console.log(e)
    }
}

function disconnect() {
}

function error(e: any) {
}



export {
    judge,
    disconnect,
    error
}
