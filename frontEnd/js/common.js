const sliceDetails=(title,size)=>{
    const result=title.length>size?title.slice(0,size)+'...':title;
   return result;
}

export default sliceDetails;

export const makeUrl=(path)=>{
    const url=`https://quotafighters.vercel.app/api`+`${path}`;
    return url;
}