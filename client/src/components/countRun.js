import { useEffect, useState } from "react"

const CountRun = ({go, end=55, time=3}) => {

    const [count, setCount] = useState(98)

    useEffect(()=>{
            if(!go)return;
            let start = 0;
            let plus = 1;
            let theTime = time * 1000;
            while(theTime / (end / plus) < 10){
                plus+=0.1;
            }
            const setTime = theTime/(end / plus);
            const run = setInterval(()=>{
                start + plus > end ? plus = 1 : start += plus;
                setCount(Math.floor(start));
                if(start >= end) clearInterval(run);
            },setTime)
    },[go, end, time])


    return(
        <h1>{count}</h1>
    )
}

export default CountRun;