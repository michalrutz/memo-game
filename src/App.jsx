import { useEffect, useState } from "react"
import './App.css';
import { halloween } from "./list";


//TO DO -> pick1(flip,disable) -> pick2(flip,disable)
//  -> compare  -> if match(keep filpped, disabled)
//              -> else (flip, able after 1 sec) 
// shuffle
// hide -> add filpped class -> toggle -> useState// shuffle


export function App(params) {
    let symbols = ["😄","😂","🥰","😘","🤑","🥵","🥶","🤡","😔","🤤"];
    symbols = halloween;

    let cards = ((symbols) => {
        let newCards = [];
        for (let i = 0; i < symbols.length; i++) {
            newCards.push({name:symbols[i], id:i+"_1", disabled:false, flipped:"back"})
            newCards.push({name:symbols[i], id:i+"_2", disabled:false, flipped:"back"})
        };
        return newCards;
    })(symbols);

    function shuffle(array) {
        let arr = [...array]; // make a deep copy!
        let num = arr.length;
        let shuffled=[];
        for (let i = 0; i < num; i++) {
            let randomIndex = Math.floor(Math.random()*arr.length);
            shuffled.push(arr[randomIndex]);
            arr.splice(randomIndex, 1);
            console.log(arr)
            console.log(array)
        }
        return shuffled
    }

    //generate DECK with card Objects
   
    useEffect( ()=>{ setDeck(shuffle(cards))}, [] );


    //FUNCTIONS
    function reset(card, time) {
        setTimeout(() => {
            setPick1(""); setPick2("");
            if(card){
                disableAndFlip(card,false,"back");      
            }         
        }, time);
    }
    function disableAndFlip(card,stop,flip="front") {
        let cardIndex = deck.findIndex( (c)=> c.id===card.id );
        deck[cardIndex] = { ...card, disabled:stop, flipped:flip};
        setDeck( [...deck] );
    }

    function handleClick(card) {   
        if (pick1===""){
                setCount(count+1)
            setPick1(card);
            disableAndFlip(card, true);
        }
        else if (pick2===""){ //second pick
            disableAndFlip(card, true);
            setPick2(card);
            if (pick1.name===card.name){
                reset(false,0)
            }else {
                disableAndFlip(pick1, false);
                disableAndFlip(card, false);
                reset(pick1,1000);
                reset(card,1000);
            }
        }
        else{
            console.log("the two picked cards are being compared, wait one second")
        }
    }

    const [deck, setDeck] = useState(cards);
    const [pick1, setPick1] = useState("");
    const [pick2, setPick2] = useState("");
    const [count, setCount] = useState(0);


    return <><main>
        <div id="result">
            <p id="feedback">{count}</p>
        </div>
        <div id="table">
            {(()=>{
                let table =[]
                for (let index = 0; index < deck.length; index++) {


                } return table
            })()}
            {deck.map( (card,i) => {
                return(
                    <div className={card.name+" "+card.flipped+" card"} key={card.id} id={card.id} onClick={ card.disabled ? ()=>{console.log("STOPED")} : ()=>handleClick(card)}>
                    <p>{card.flipped==="front" ? card.name : ""}</p></div>
                )
                })}
        </div>
        
    </main>
    <footer>
        made by Michal Rucinski
    </footer>        
    </>
}