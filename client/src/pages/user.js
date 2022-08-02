import { useState } from "react";
import { gql, useQuery } from '@apollo/client';

function User() {
    const { loading, data } = useQuery(gql`query Item {
        item {
          _id
          name
          ingredients {
            _id
            name
          }
          desc
          rest {
            _id
            name
          }
        }
      }`);
    const items = data?.thoughts || [];
    // console.log(data, items)

    let selectors = [];

    const f = (e) => {
        // console.log(states);
        Object.keys(states).forEach(ingredient => {
            if((states[ingredient]==0&&e.ingredients.includes(ingredient))||(states[ingredient]==2&&!e.ingredients.includes(ingredient))) {
                console.log(e.name,ingredient,false)
                return false
            }
        });
        // console.log(e.name,true)
        return true
    }

    const u = (e) => {
        let newStates = structuredClone(states);
        newStates[e.target.name] = e.target.value
        console.log(e.target.name,e.target.value);
        setStates(newStates);
    }

    function Selector(props) { 
        let j =(<div className="selector" onChange={u}>
            <input id={props.name+"x"} type="radio" value="0" name={props.name} onChange={()=>{}}/>
            <label htmlFor={props.name+"x"} className="X">✗</label>
            <input id={props.name+"s"} type="radio" value="1" name={props.name} onChange={()=>{}}/>
            <label htmlFor={props.name+"s"} className="S">/</label>
            <input id={props.name+"t"} type="radio" value="2" name={props.name} onChange={()=>{}}/>
            <label htmlFor={props.name+"t"} className="T">✓</label>
        </div>)
        selectors.push(j);
        let x = (<div className="superSelector">
            {props.name}
            {j}
        </div>)
        
        return (x);
    }
    // var states = [useState([]),useState([]),useState([])];
    var [states, setStates] = useState({});
    const [query, setQuery] = useState("");
    const results = [
        {
            name: "Roadhouse Whopper®",
            desc: "100% flame-grilled Aussie beef topped with melted cheese, double premium eye bacon, special sauce, pickles, onion, lettuce and tomato on a toasted sesame seed bun.",
            ingredients: [
                "beef",
                "cheese",
                "bacon",
                "pickles",
                "onion",
                "lettuce",
                "tomato",
                "gluten",
                "sesame",
                "yeast"
            ]
        },
        {
            name: "Roadhouse Whopper® 2: Electric Boogaloo",
            desc: "100% flame-grilled Aussie beef topped with melted cheese, double premium eye bacon, special sauce, pickles, onion, lettuce and tomato on a toasted sesame seed bun.",
            ingredients: [
                "beef",
                "cheese",
                "bacon",
                "pickles",
                "onion",
                "lettuce",
                "tomato",
                "gluten",
                "sesame",
                "yeast"
            ]
        },
        {
            name: "Vegan Tacos",
            desc: "Tacos that contain no meat",
            ingredients: [
                "iceberg lettuce",
                "tomato",
                "chickpea",
                "pickles",
                "onion",
                "gluten",
                "sesame",
                "yeast"
            ]
        },
    ]

    const filters = {
        Meats: [
            "beef",
            "chicken",
            "Pork",
            "Lamb",
            "Fish",
            "Shellfish"
        ],
        Allergies:[
            "Gluten",
            "egg",
            "lactose",
            "peanut",
            "tree nuts",
        ]
    }

    return (
    <>{/*
        <User page>
        <filters>
            <black/whitelist of ingredients>
            <tick box/>
            <ingredient name/>
            </black/whitelist of ingredients>
        </filters>
        <search>
            <search box/>
            <search result> click anywhere on result to direct to menu item page
            <Item full name/>
            <Item desc/>
            <item ingredients/>
            <item restaurant/>
            </search result>
        </search>
        </User page>
        */}
        <div className="search">
            <h3>Search</h3>
            <input id="search" onChange={e=>{setQuery(e.target.value)}} onSelect={e=>{console.log(states)}}/>
        </div>
        <div className="below">
            <ul className="filters">
                {Object.keys(filters).map(category=>(
                    <li>
                        <Selector name={category} />
                        <ul>
                            {filters[category].map(item=>(<>
                                <li>
                                    <Selector name={item} state={states}/>
                                </li>
                            </>))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="results">
                {results.filter(e=>((f(e))&&(e.name.toLowerCase().includes(query.toLowerCase())||!query))).map(result => (
                    <>
                        <div className="result">
                            <p className="item-name">
                            {result.name}
                            </p>
                            <p className="item-desc">
                                {result.desc}
                            </p>
                            <div className="item-ingredients">
                                <h4>Contains:</h4>
                                <div>
                                    {result.ingredients.map(ingredient=>(
                                        <p>{ingredient}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    </>
    );
}

export default User;