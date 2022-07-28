function App() {
  const title = 'Omni Menu';
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>{/*
      <home webpage>
        <title/>
        <brief desc/>
        <login panel>
          <user>
            <email/>
            <password/>
            <login button/>
            <skip/view anon button/>
          </user>
          <restaurant>
            <email/>
            <password/>
            <login button/>
          </restaurant>
        </login panel>
      </home webpage>

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
      <User page>
      
      <Restaurant page>
        <restaurant info>
          <name/>
          <desc/>
          <address/contact info/>
          <edit button/>
        <restaurant info>
        <menu>
          <menu items>
            <Item full name/>
            <Item desc/>
            <item ingredients/>
            <viewership stats>
              <?>*n
            </viewership stats>
            <edit button/>
          </menu items>
          <edit button/>
        </menu>
      <Restaurant page>
      
     */}</>
  );
}

export default App;
