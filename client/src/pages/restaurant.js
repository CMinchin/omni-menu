function restaurant() {
    const info = {
        name: "Hungry Jack's",
        desc: "Hungry Jack's makes it better",
        contact: [
            "0412 567 987",
            "100 Charming Ave"
        ],
        edit: true,
        menu: [
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
    };
    return (
        <>
            <h2>
                {info.name + " "}
                {info.edit && <button>Edit</button>}
            </h2>
            <div className="rest-info">
                <h5>{info.desc}</h5>
                <div className="contact">
                    <h5>Address and contact info:</h5>
                    <ul className="contact-info list-group">
                        {info.contact.map(item=>(
                            <li className="list-group-item">
                                {item}
                          </li>
                        ))}
                    </ul>
                </div>
            </div>
            <h5>Menu Items:</h5>
            <div className="menu">
                { info.menu.map( item => (<>
                    <p className="item-name">
                        {item.name}
                    </p>
                    <p className="item-desc">
                        {item.desc}
                    </p>
                    <div className="item-ingredients">
                        <h4>Contains:</h4>
                        <ul>
                            {item.ingredients.map(ingredient=>(
                                <li>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </>))}
            </div>
        </>
    );
  }
  
  export default restaurant;