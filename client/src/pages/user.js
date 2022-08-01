function Selector(props) { 
    return (
        <div className="superSelector">
            {props.name}
            <div className="selector">
                <input id={props.name+"x"} type="radio" value="-1" name={props.name}/>
                <label for={props.name+"x"} className="X">✗</label>
                <input id={props.name+"s"} type="radio" value="0" name={props.name} checked="checked"/>
                <label for={props.name+"s"} className="S">/</label>
                <input id={props.name+"t"} type="radio" value="1" name={props.name}/>
                <label for={props.name+"t"} className="T">✓</label>
            </div>
        </div>
    );
}

function user() {
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
        }
    ]

    const filters = {
        Meats: [
            "Beef",
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
            <input id="search"/>
        </div>
        <div className="below">
            <ul className="filters">
                {Object.keys(filters).map(category=>(
                    <li>
                        <Selector name={category} />
                        <ul>
                            {filters[category].map(item=>(<>
                                <li>
                                    <Selector name={item} />
                                </li>
                            </>))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="results">
                {results.map(result => (
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
                ))}
            </div>
        </div>
    </>
    );
}

export default user;