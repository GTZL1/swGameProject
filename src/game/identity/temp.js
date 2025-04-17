/*<InputLabel id="allegiancesSelect-label">Allegiances</InputLabel>
            <Select labelId='allegiancesSelect-label' 
                value={tempAllegiances}
                multiple
                id="allegiancesSelect"
                //onClose={() => setSelectedAllegiances(tempAllegiances)}
                >
                    <div id="labels" key={-1}>
                        {allAllegiances.map((a, index) =>(
                            <FormControlLabel key={index} control={<Checkbox
                            id={a}
                                checked={tempAllegiances.includes(a)}
                                onChange={handleChange}
                                value={a}
                                />}
                            label={a} labelPlacement='end'/>
                            ))}
                    </div> 
            </Select>

<details>
<summary>Your favourite cars list</summary>
  <fieldset>
    <legend>Cars</legend>
    <ul>
      <li>
        <label>BMW<input type="checkbox" id="bmw" name="bmw" value="bmw" /></label>
      </li>
      <li>
        <label>Citroen
        <input type="checkbox" id="citroen" name="citroen" value="citroen" /></label>
      </li>
      <li>
        <label>Skoda
        <input type="checkbox" id="skoda" name="skoda" value="skoda" /></label>
      </li>
      <li>
        <label>Volvo
        <input type="checkbox" id="volvo" name="volvo" value="volvo" /></label>
      </li>
    </ul>
  </fieldset>

</details>*/

/*
        const [tempCategory, setTempCategory] = useState("none");
        const [showPlaceholder, setShowPlaceholder] = useState(true);
        <select id="category"
                value={tempCategory}
                onChange={(e) => setTempCategory(e.target.value)}
                onFocus={() => setShowPlaceholder(false)}
                onClose={() => setSelectedCategory(tempCategory)}
                style={{color : showPlaceholder ? "grey" : "black"}}>
                    <option key={-1} disabled value="none"
                        style={{display : showPlaceholder ? "inline" : "none"}}>
                            Select category...
                    </option>
                    {allCategories.map((c, index) => <option key={index} value={c}>{c}</option>)}
            </select>
        */