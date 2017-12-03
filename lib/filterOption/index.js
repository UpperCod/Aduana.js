export default function filterOption(options,message){
    return (next,observer)=>{
        if(options.indexOf(observer.value)){
            next(observer);
        }else{
            observer.invalid(message);
        }
    }
}