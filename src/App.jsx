import { useState } from "react"
import './App.css';

export function App(params) {
    const cards = [
        {name:"😄", id:1_1 },
        {name:"😄", id:1_2 },
        {name:"😂", id:2_1 },
        {name:"😂", id:2_2 },
        {name:"🥰", id:3_1 },
        {name:"🥰", id:3_2 }
    ]
    function reset() {
        setDisabled(true)
        setTimeout(() => {
            setPick1(""); setPick2(""); setDisabled(false)
        }, 1000);
    }

    function handleClick({name,id}) {    
        if (pick1===""){
            setPick1(name);
        }
        else if (pick2===""){
            setPick2(name);
            if (pick1===name){
                console.log("is a match");
                console.log(document.getElementById(id).setAttribute("stop", true))
                reset();
            }else {
                console.log("it's not a match");
                reset();
            }
        }
     
    }

    const [deck, setDeck] = useState(cards);
    const [pick1, setPick1] = useState("");
    const [pick2, setPick2] = useState("");
    const [disabled, setDisabled] = useState(false);

    
    return <div className="table">
        {deck.map( card => (
            <div className={card.name+" card"} id={card.id} stop={"false"} onClick={ disabled ? ()=>{} :()=>handleClick(card)}>
                <p>{card.name}</p>
            </div>))}
            {pick1}{pick2}
    </div>
}