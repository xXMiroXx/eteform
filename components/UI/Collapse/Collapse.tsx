import React, { RefObject } from "react";

import Item from "../Item/Item";

import Styles from "./Collapse.module.scss";

interface Props {
  name?: string;
  iconOn?: string;
  iconOff?: string;
}

// Collapse State handler class
class CollapseState {
  active: boolean = false;
  maxH: string = "0px";
  timer: NodeJS.Timeout | null = null;
  animation: number = 200;
  // animationTimer:number=200;
  contentRef: RefObject<HTMLDivElement> | undefined;

  constructor(state?: Readonly<CollapseState>) {
    if (state) Object.assign(this, state);
  }

  set animationTimer(time: number) {
    this.animation = time + 50;
  }

  toggle() {
    this.active = !this.active;
    this.handelChanges();
  }

  change(turn: boolean) {
    this.active = turn;
    this.handelChanges();
  }

  handelChanges() {
    if (this.timer) clearTimeout(this.timer);

    if (this.contentRef?.current) {
      const ref = this.contentRef.current;
      if (this.active) {
        ref.style.maxHeight = ref.scrollHeight + "px";
        this.timer = setTimeout(() => {
          ref.style.maxHeight = "max-content";
        }, this.animation);
      } else {
        ref.style.maxHeight = ref.scrollHeight + "px";
        this.timer = setTimeout(() => {
          ref.style.maxHeight = "0px";
        }, 0);
      }
    }
  }
}

export default class Collapse extends React.Component<Props, CollapseState> {
  className: string = "";
  state = new CollapseState();
  collapseRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  timer: NodeJS.Timeout | null = null;
  config = {
    animationTime: 200,
    float: false,
  };
  constructor(props: Props) {
    super(props);
    // Collapse active state!
    // To: Detect of outer click belong to collapse or not
    this.collapseRef = React.createRef();
    this.contentRef = React.createRef();
    // To: Remove event listner from Dom when unmount
    this.onClickAway = this.onClickAway.bind(this);
    this.changeWindowHandler = this.changeWindowHandler.bind(this);
  }

  // Once componente load on screen attach listner to DOM
  componentDidMount() {
    // Watch if there is any click outside collapse
    document.addEventListener("mousedown", this.onClickAway);
    // Watch any change in width then change collapse height
    window.addEventListener("resize", this.changeWindowHandler);

    this.setState({
      contentRef: this.contentRef,
      animationTimer: this.config.animationTime,
    });
  }
  // Clean listner after
  componentWillUnmount() {
    window.removeEventListener("resize", this.changeWindowHandler);
    document.removeEventListener("mousedown", this.onClickAway);
  }

  // Toggle Collapse on each click
  onClick() {
    this.setState((cur) => {
      const newState = new CollapseState(cur);
      newState.toggle();
      return newState;
    });
  }
  // Click somewhere else? No list for you xD
  onClickAway(e: any) {
    const ref = this.collapseRef;
    // To detrimne where the click exactly landed
    if (ref && !ref.current?.contains(e.target))
      this.setState((cur) => {
        const newState = new CollapseState(cur);
        newState.change(false);
        return newState;
      });
  }

  changeWindowHandler() {
    const content = this.contentRef.current;
    if (this.state.active) {
      content!.style.maxHeight = content!.scrollHeight + "px";
    }
  }

  // Can be override to implement suitable one

  collapseHead() {
    return <div></div>;
  }

  _content() {
    return (
      <div
        style={{
          position: (this.config.float && "absolute") || "relative",
          transition: `all ${this.config.animationTime}ms`,
        }}
        ref={this.contentRef}
        className={Styles.collapse__content}
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
        {this.collapseHead()}
        {this._content()}
      </div>
    );
  }
}
