import Styles from "./NewNav.module.scss";
import { NavItem, NavProps } from "@/types/nav";
import Collapse from "../UI/Collapse/Collapse";
import Item from "../UI/Item/Item";
import Logo from "../Logo";
import { FaBars } from "react-icons/fa";
class CollapseNav extends Collapse {
  constructor(props: any) {
    super(props);
    this.config.animationTime = 300;
  }
  collapseHead() {
    return (
      <div className={Styles.nav__collapse}>
        <span onClick={this.onClick.bind(this)}>
          <FaBars />
        </span>
        <span>
          <Logo className={Styles.nav__logo} />
        </span>
      </div>
    );
  }
}

class CollapseItem extends Collapse {
  constructor(props:any) {
    super(props);
    this.config.animationTime = 300;
  
  }
  collapseHead() {
    return (
      <li onClick={this.onClick.bind(this)}>
        <Item
          name={this.props.name}
          icon={this.state.active ? "FaChevronUp" :"FaChevronUp"}
        />
      </li>
    );
  }
}
export default function newNav({ navList }: NavProps) {
  const genrateList=(list:NavItem[])=>{
   return list.map(item=>{
     if(item.nestedList){
       return <CollapseItem name={item.name} >
       <ul className={Styles.nav__nested}>
         
       </ul>
       </CollapseItem>
     }
   })
  }
  return (
    <nav className={Styles.nav}>
      <CollapseNav>
        <ul className={Styles.nav__list}>
          <li>item 1</li>
          <li>item 2</li>
          <CollapseItem
            name="nested"
            iconOff="FaChevronUp"
            iconOn="FaChevronDown"
          >
            <ul>
              <li>nested item 1</li>
              <li>nested item 2</li>
            </ul>
          </CollapseItem>
          <li>item 3</li>
        </ul>
      </CollapseNav>
    </nav>
  );
}
