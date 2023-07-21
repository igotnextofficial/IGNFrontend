const hasImportantKey = (key: string, object: object) => {
    return Object.hasOwn(key)
}

export const wrappedData = (data)=>{
    if(Object.hasOwn(data,'data')){ return data}

    let wrappedData = {data:{}}
    for(const [key,value] of data){
        wrappedData.data[key] = value;
    }

    return wrappedData
}