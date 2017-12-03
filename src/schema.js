
export default function schema(scan){
    let props = Object.keys(scan);
    return ({valid,invalid,value})=>{
        let loading = 0,
            isInvalid,
            response = {valid:{},invalid:{}}
        props.map((prop)=>{
            loading++;
            return prop;
        }).forEach(prop=>{
            scan[prop]({
                value:value[prop],
                valid(value){
                    if( value !== undefined ){
                        response.valid[prop] = value;
                    }
                    if(!--loading) {
                        isInvalid ? invalid(response) : valid(response)
                    }
                },
                invalid(value){
                    isInvalid = true;
                    if( value !== undefined ){
                        response.invalid[prop] = value;
                    }
                    if(!--loading) invalid(response);
                }
            })
        })
        return response;
    }
}