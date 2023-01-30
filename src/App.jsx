import { useState } from "react"
import './App.css';

export function App(params) {
    const symbols = ["😄","😂","🥰","😘","🤑"];

    //generate DECK with card Objects
    let cards = ((symbols) => {
        let newCards = [];
        for (let i = 0; i < symbols.length; i++) {
            newCards.push({name:symbols[i], id:i+"_1", disabled:false})
            newCards.push({name:symbols[i], id:i+"_2", disabled:false})
        };
        return newCards;
    })(symbols);

    function reset() {
        setDisabled(true)
        setTimeout(() => {
            setPick1(""); setPick2(""); setDisabled(false)
        }, 1000);
    }
    function block({name,id},stop) {
        let cardIndex = deck.findIndex( (card)=> card.id===id );
        if (stop){
            deck[cardIndex] = { name:"", id:id, disabled:stop};
        }else{
            deck[cardIndex] = { name:name, id:id, disabled:stop};
        }
        setDeck( [...deck] );
    }

    function handleClick(card) {    
        if (pick1===""){
            setPick1(card);
            //disable
            block(card, true);
        }
        else if (pick2===""){
            block(card, true);
            setPick2(card);
            if (pick1.name===card.name){
                document.getElementById("feedback").innerHTML="it's a match";
                // use setDeck -> change disable to true
                reset();
            }else {
                document.getElementById("feedback").innerHTML="it's not a match";
                block(pick1, false);
                block(card, false);
                reset();
            }
        }
        else{
            console.log("cards are disabled")
        }
     
    }

    const [deck, setDeck] = useState(cards);
    const [pick1, setPick1] = useState("");
    const [pick2, setPick2] = useState("");
    const [disabled, setDisabled] = useState(false);

    
    return <main>
        <div id="result">
            <p id="feedback">?</p>
        </div>
        <div id="table">
            {deck.map( card => (
                <div className={card.name+" card"} key={card.id} id={card.id} onClick={ card.disabled ? ()=>{console.log("STOPED")} :()=>handleClick(card)}>
                    <p>{card.name}</p>
                </div>))}
        </div>
    </main>
}