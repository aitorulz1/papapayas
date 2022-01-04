import React, { useState } from "react";
import Menu from "../data/menu";
import NavItems from "./NavItems";

export default function Nav() {
  const [menus, setMenu] = useState([]);
  console.log(Menu);
  return (
    <div>
      <ul>
        {Menu.map((item) => (
          //   <NavItems key={item.id} item={item} />
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
