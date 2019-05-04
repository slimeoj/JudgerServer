/**
 * 创建一个类: 进行顺序执行操作
 */

export interface IContext {
    [k: string]: any
}

export interface IMiddleware {
    (ctx: IContext, next: Function): any
}



export type Imix = [string, Object]



interface ICompose {
}

export interface ICompose_child_class {
    name: string
    [k: string]: any
}

class Compose implements ICompose {

    private M: Map<string, ICompose_child_class> = new Map()
    private middlewares: Map<string, Imix[]> = new Map()

    constructor() {
    }

    /** 注册 */
    regist(child: ICompose_child_class) {
        if (!this.M.has(child.name)) {
            this.M.set(child.name, child)
        }
        else
            throw (`${child.name} had registed!`)
    }

    check() {
    }

    /** 生成中间件,并注册 */
    composeMiddleware(name: string): Function {
        let middlewares: Imix[] | undefined = this.middlewares.get(name);

        if (!middlewares)
            throw (new Error(`middlewares ${name} is not registed`))

        let self = this
        return function(ctx: IContext) {
            let index = -1
            return dispatch(0)

            function dispatch(i: number): Promise<any> {
                if (i <= index) {
                    return Promise.reject(new Error('next() called multiple times'))
                }
                index = i

                let fn: Imix | undefined = middlewares![i]

                if (fn) return Promise.resolve()

                try {

                    let [fn_names, fn_data] = fn!
                    let [class_name, fn_name] = fn_names.split(".")
                    let class_entiy = self.M.get(class_name)

                    return class_entiy![fn_name].bind(
                        class_entiy,
                        fn_data || dispatch.bind(null, i + 1),
                        !fn_data ? undefined : dispatch.bind(null, i + 1)
                    )

                }
                catch (error) {
                    return Promise.reject(error)
                }
            }
        }

    }


}
