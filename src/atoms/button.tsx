import React from "react";
import BootstrapButton from "react-bootstrap/Button";
import "./button.scss";

export function Button(props) {
  return (
    <BootstrapButton className="brand-button">{props.title}</BootstrapButton>
  );
}

export function AccentButton(props) {
  return (
    <BootstrapButton className="brand-button brand-button--accent" {...props}>
      {props.title}
    </BootstrapButton>
  );
}
