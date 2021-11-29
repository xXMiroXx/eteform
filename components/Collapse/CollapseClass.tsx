import React from "react";

interface Props {
  name?: string;
  icon?: string;
}
interface State {
  active: boolean;
}
export default class CollapseClass extends React.Component<Props, State> {
  className: string = "";
  collapseRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    // Collapse active state!
    this.state = { active: false };
    // To: Detect of outer click belong to collapse or not
    this.collapseRef = React.createRef();
    // To: Remove event listner from Dom when unmount
    this.onClickAway = this.onClickAway.bind(this);
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
  // Once componente load on screen attach listner to DOM
  componentDidMount() {
    document.addEventListener("mousedown", this.onClickAway);
  }
  // Clean listner after
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickAway);
  }
  // Can be override to implement suitable one
  Head() {
    return (
      <button onMouseDown={this.onClick.bind(this)} className="collapse__btn">
        <span className="collapse__icon">{this.props.icon}</span>
        <span className="collapse__header">{this.props.name}</span>
      </button>
    );
  }
  // Can also be overriden
  Content() {
    return (
      <div
        className={`collapse__content ${
          (this.state.active && "collapse--active") || ""
        }`}
      >
        {this.props.children}
      </div>
    );
  }
  // Finally render
  render() {
    return (
      <div ref={this.collapseRef} className={this.className}>
        {this.Head()}
        <div
          className={`collapse__content ${
            (this.state.active && "collapse--active") || ""
          }`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
