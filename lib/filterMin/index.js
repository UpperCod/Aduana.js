export default function filterMin(length,message){
    return (next,observer)=>{
        if(observer.value <= length){
            next(observer);
        }else{
            observer.invalid(message)
        }
    }
}