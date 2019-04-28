declare namespace JudgeServer {
    interface postJudgeData { // 发送过来的评测数据的模式
        id: number | string,
        lang: string,
        code: string,
        memory: number,
        time: number,
        stack: number,
        spj: string
    }

    interface compile_type_data {
            type:'compile',
            socket_client_id:string,
            raw:postJudgeData
    }
}



