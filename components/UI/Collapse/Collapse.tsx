import React, { MutableRefObject } from "react";

import Styles from "./Collapse.module.scss";

interface Props {
  name?: string;
  iconOn?: string;
  iconOff?: string;
  float?: boolean;
  className?: string;
}

interface State {
  active: boolean;
}

export default class Collapse extends React.Component<Props, State> {
  className: string = "";
  state = {
    active: false,
  };

  collapseRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  timer: MutableRefObject<NodeJS.Timeout | null>;
  config = {
    animationTime: 200,
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
    this.timer = React.createRef();
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.active !== prevState.active) {
      if (this.contentRef.current) {
        if (this.timer.current) clearTimeout(this.timer.current);
        const content = this.contentRef.current;
        if (this.state.active) {
          content.style.maxHeight = content.scrollHeight + "px";
          this.timer.current = setTimeout(() => {
            content.style.maxHeight = "max-content";
          }, this.config.animationTime);
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          this.timer.current = setTimeout(() => {
            content.style.maxHeight = "0px";
          }, 0);
        }
      }
    }
  }

  // Toggle Collapse on each click
  onClick() {
    this.setState((cur) => {
      return { active: !cur.active };
    });
  }
  // Click somewhere else? No list for you xD
  onClickAway(e: MouseEvent) {
    const collapse = this.collapseRef.current;
    if (!collapse?.contains(e.target as HTMLElement))
      if (this.state.active) this.onClick();
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
          position: (this.props.float && "absolute") || "relative",
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
        className={`${Styles.collapse} ${this.props.className || ""}`}
      >
        {this.collapseHead()}
        {this._content()}
      </div>
    );
  }
}
