import If from "../If/If";
import Else from "../Else/Else";
import ElseIf from "../ElseIf/ElseIf";
import isFunction from "lodash.isfunction";

const hasValidChildren = children => {
  // If multiple children
  // - All children should be one of 'If', 'Else', 'ElseIf'.
  // - First child should be 'If'.
  // - Else should only be used once.
  // - Else should be used at last.
  // If only one child
  // - It must be 'If'

  if (!children) {
    console.warn(
      "No Children found, Decide must contain at least one 'If' Component as child component."
    );
    return false;
  }

  if (Array.isArray(children) && children.length > 0) {
    if (
      !children.every(
        child =>
          child.type === If || child.type === Else || child.type === ElseIf
      )
    ) {
      console.error(
        "Invalid children found, Child for 'Decide' should be one of 'If', 'Else', 'ElseIf'."
      );
      return false;
    }
    let elseChildren = children.filter(child => child.type === Else);
    if (elseChildren.length > 1) {
      console.error("Else should be used only once.");
      return false;
    } else if (elseChildren.length === 0) {
      return true;
    } else {
      if (children[children.length - 1].type !== Else) {
        console.error("Else should be used at last.");
        return false;
      } else {
        return true;
      }
    }
    if (children[0].type === If) return true;
    else {
      console.error("First Children must be an 'If' component");
      return false;
    }
  } else {
    if (children.type === If) return true;
    else {
      console.error("First Children must be an 'If' component");
      return false;
    }
  }
};

const evaluateChildren = children => {
  if (Array.isArray(children) && children.length > 0) {
    let trutyChild = children.find(child =>
      evaluateConditionProp(child.props.condition)
    );
    if (trutyChild) {
      return trutyChild;
    } else {
      let lastChild = children[children.length - 1];
      return lastChild.type === Else ? lastChild : null;
    }
  } else {
    return typeof children.props.condition !== "undefined" &&
      evaluateConditionProp(child.props.condition)
      ? children
      : null;
  }
};

const evaluateConditionProp = condition =>
  isFunction(condition) ? condition() : condition;

const Decide = props => {
  if (!hasValidChildren(props.children)) return null;
  return evaluateChildren(props.children);
};

Decide.propTypes = {};

export default Decide;
