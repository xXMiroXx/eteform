import React, { MouseEventHandler } from "react";
import DOM from "react-dom";

import Styles from "./Overlay.module.scss";

type Props = {
  onClickAway: MouseEventHandler;
};
export default class Overlay extends React.Component<Props> {
  state = { ready: false };
  componentDidMount() {
    this.setState({ ready: true });
  }
  Model() {
    return (
      <div onClick={this.props.onClickAway} className={Styles.model}>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      (this.state.ready &&
        DOM.createPortal(
          this.Model(),
          document.getElementById("overlay")!
        )) || <div></div>
    );
  }
}
