import { useEffect,useState } from "react";
function useCurrency(curr){
    const [data,setData]=useState({})
    useEffect(()=>{
        let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curr}.json`
        fetch(url).then((res)=>res.json())
        .then((res)=>setData(res[curr]))
    },[curr])
    console.log(data)
    return data;
}
export default useCurrency;