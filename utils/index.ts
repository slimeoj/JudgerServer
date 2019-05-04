import * as jsyaml from 'js-yaml'
import * as fs from 'fs'

/** 加载yaml配置 */
export function load_yaml(path:string){
    return jsyaml.load(fs.readFileSync(path,{encoding:'utf-8'}));
}

/** JSON stringify */
export const JSON2STR = JSON.stringify
export const STR2JSON = JSON.parse
