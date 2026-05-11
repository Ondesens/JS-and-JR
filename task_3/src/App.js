
import "./App.css";
import {PostInfo} from "./components/PostInfo/PostInfo";
import {useState} from "react";
function App() {
    const [selectUser, setSelectUser] = useState("0");

    const handleUserChange = (event) => {
        setSelectUser(event.target.value);
        console.log(event.target.value);
    };
  return (
         <div>
             <select value={selectUser} onChange={handleUserChange}>
                 <option value='0'>Все пользователи</option>
                 <option value="1">Leanne Graham</option>
                 <option value="2">Ervin Howell</option>
                 <option value="3">Clementine Bauch</option>
                 <option value="4">Patricia Lebsack</option>
                 <option value="5">Chelsey Dietrich</option>
                 <option value="6">Mrs. Dennis Schulist</option>
                 <option value="7">Kurtis Weissnat</option>
                 <option value="8">Nicholas Runolfsdottir V</option>
                 <option value="9">Glenna Reichert</option>
                 <option value="10">Clementina DuBuque</option>
             </select>
             <PostInfo selectUser={selectUser} />
         </div>)
}
export default App;
