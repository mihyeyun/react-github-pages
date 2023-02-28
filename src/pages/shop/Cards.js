import { useState } from "react"
import Card from "./Card.js"

function Cards({changedata}){

    const [items, setItems] = useState([
        { id: 1, img: '/img/banana.png', stat: "" },
        { id: 1, img: '/img/banana.png', stat: "" },
        { id: 2, img: '/img/cherry.png', stat: "" },
        { id: 2, img: '/img/cherry.png', stat: "" },
        { id: 3, img: '/img/eggplant.png', stat: "" },
        { id: 3, img: '/img/eggplant.png', stat: "" },
        { id: 4, img: '/img/grape.png', stat: "" },
        { id: 4, img: '/img/grape.png', stat: "" },
        { id: 5, img: '/img/kiwi.png', stat: "" },
        { id: 5, img: '/img/kiwi.png', stat: "" },
        { id: 6, img: '/img/tomato.png', stat: "" },
        { id: 6, img: '/img/tomato.png', stat: "" },
        { id: 7, img: '/img/water.png', stat: "" },
        { id: 7, img: '/img/water.png', stat: "" },
        { id: 8, img: '/img/carrot.png', stat: "" },
        { id: 8, img: '/img/carrot.png', stat: "" }
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1);

    

    function check(current){
        if(items[current].id === items[prev].id){
            console.log(items[current].id, items[prev].id)
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
          
                if(items[0].stat == "correct" && items[1].stat == "correct" && items[2].stat == "correct" && items[3].stat == "correct" && items[4].stat == "correct" && items[5].stat == "correct" && items[6].stat == "correct" && items[7].stat == "correct" && items[8].stat == "correct" && items[9].stat == "correct" && items[10].stat == "correct" && items[11].stat == "correct" && items[12].stat == "correct" && items[13].stat == "correct" && items[14].stat == "correct" && items[15].stat == "correct"){
            
                    changedata(3)
                }else{
                    changedata(2)
                }
            
          
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            let afterWrong = setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
                changedata(2)
            }, 100)
            return()=>{
                clearTimeout(afterWrong)
            }
        }
    }

    function handleClick(id){
        if(prev === -1){
            console.log("전" + prev)
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
            console.log("후" + prev)
        }else{
            check(id)
        }
    }


    return (
        <div className="box">
            {items.map((item, index)=>{
                return(
                <>
       
                <Card key={index} item={item} id={index} handleClick={handleClick} onClick={changedata} />
                </>
                )
            })}
        </div>
    )
}

export default Cards