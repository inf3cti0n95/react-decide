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
      throw new Error(
        "Invalid children found, Child for 'Decide' should be one of 'If', 'Else', 'ElseIf'."
      );
    }
    if (children[0].type === If) {
      let elseChildren = children.filter(child => child.type === Else);
      let ifChildren = children.filter(child => child.type === If);

      if (ifChildren.length > 1)
        throw new Error("'If' should be used only once.");
        
      if (elseChildren.length > 1) {
        throw new Error("Else should be used only once.");
      } else if (elseChildren.length === 0) {
        return true;
      } else {
        if (children[children.length - 1].type !== Else) {
          throw new Error("Else should be used at last.");
        } else {
          return true;
        }
      }
    } else {
      throw new Error("First Children must be an 'If' component");
    }
  } else {
    if (children.type === If) return true;
    else {
      throw new Error("First Children must be an 'If' component");
    }
  }
};

const evaluateChildren = children => {
  if (Array.isArray(children) && children.length > 0) {
    let truthyChild = children.find(child =>
      evaluateConditionProp(child.props.condition)
    );
    if (truthyChild) {
      return truthyChild;
    } else {
      let lastChild = children[children.length - 1];
      return lastChild.type === Else ? lastChild : null;
    }
  } else {
    return typeof children.props.condition !== "undefined" &&
      evaluateConditionProp(children.props.condition)
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
