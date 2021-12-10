import React from "react";
import Image from "next/image";
import Styles from "./Pair.module.scss";

interface PairProps {
  image: string;
  alt: string;
}

export default class Pair extends React.Component<PairProps> {
  render() {
    const { image, alt, children } = this.props;
    return (
      <div className={Styles.pair}>
        <div className={Styles.pair__img}>
          <Image
            src={image}
            alt={alt}
            layout="responsive"
            width="250"
            height="250"
          />
        </div>
        <div className={Styles.pair__content}>{children}</div>
      </div>
    );
  }
}
