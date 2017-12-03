export default function filterPattern(pattern,message){
    return (next,observer)=>{
        if( pattern.test(observer.resolved) ){
            next(observer);
        }else{
            observer.invalid(message);
        }
    }
}