import {load_yaml} from '../utils'

const env:string = process.env.ENV || 'develpoment'
export const isDev = env.toLowerCase() === 'develpoment'
export const isPro = env.toLowerCase() === 'production'


export const default_judge_argment = {
    lang: "c++",
    memory: 128*1024*1024 ,//128mb
    time: 1000 ,//1s
    stack: 128*1024*1024,//128mb
    spj: "check2"
}


/** redis的配置 */
export const redis_config = isDev ? load_yaml(__dirname+'/'+'redis_development.yml') :load_yaml(__dirname+'/'+'redis_production.yml')

console.log(__dirname+'/'+'redis_development.yml')
console.log(env)
console.log(isDev)
console.log(isPro)
