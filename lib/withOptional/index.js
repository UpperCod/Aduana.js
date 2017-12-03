export default function withOptional(option){
    return (next,{invalid,valid,value})=>next({
        value,
        valid(value){
            valid(value);
        },
        invalid(){
            valid(option);
        }
    });
}