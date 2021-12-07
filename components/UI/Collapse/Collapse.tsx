import React from "react";
import Item from "../Item/Item";

import Styles from "./Collapse.module.scss";

interface Props {
  name?: string;
  icon?: string;
}
interface State {
  active: boolean;
}
export default class Collapse extends React.Component<Props, State> {
  className: string = "";
  collapseRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    // Collapse active state!
    this.state = { active: false };
    // To: Detect of outer click belong to collapse or not
    this.collapseRef = React.createRef();
    this.contentRef = React.createRef();
    // To: Remove event listner from Dom when unmount
    this.onClickAway = this.onClickAway.bind(this);
    this.changeWindowHandler = this.changeWindowHandler.bind(this);
  }

  // Toggle Collapse on each click
  onClick() {
    this.setState((cur) => ({ active: !cur.active }));
  }
  // Click somewhere else? No list for you xD
  onClickAway(e: any) {
    const ref = this.collapseRef;
    // To detrimne where the click exactly landed
    if (ref && !ref.current?.contains(e.target))
      this.setState({ active: false });
  }

  changeWindowHandler() {
    const content = this.contentRef.current;
    if (this.state.active) {
      content!.style.maxHeight = content!.scrollHeight + "px";
    }
  }

  // Once componente load on screen attach listner to DOM
  componentDidMount() {
    // Watch if there is any click outside collapse
    document.addEventListener("mousedown", this.onClickAway);
    // Watch any change in width then change collapse height
    window.addEventListener("resize", this.changeWindowHandler);
  }
  // Clean listner after
  componentWillUnmount() {
    window.removeEventListener("resize", this.changeWindowHandler);
    document.removeEventListener("mousedown", this.onClickAway);
  }
  // Can be override to implement suitable one
  button() {
    return <div>button</div>;
  }

  _button() {
    return (
      <button
        onClick={this.onClick.bind(this)}
        className={Styles.collapse__btn}
      >
        {this.button()}
      </button>
    );
  }
  // Can also be overriden
  _content() {
    const { active } = this.state;
    const content = this.contentRef.current;
    return (
      <div
        ref={this.contentRef}
        className={Styles.collapse__content}
        style={{ maxHeight: `${active ? content?.scrollHeight + "px" : 0}` }}
      >
        {this.props.children}
      </div>
    );
  }
  // Finally render
  render() {
    return (
      <div
        ref={this.collapseRef}
        className={`${Styles.collapse} ${
          (this.state.active && Styles["collapse--active"]) || ""
        }`}
      >
        {this._button()}
        {this._content()}
      </div>
    );
  }
}
