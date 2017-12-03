export default function withDefault(option){
    return (next,{valid,invalid,value})=>next({
        valid,invalid,
        value : value === undefined ? option : value
    })
}