'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PropTypes = _interopDefault(require('prop-types'));
var isFunction = _interopDefault(require('lodash.isfunction'));

var If = function If(props) {
  return props.children;
};

If.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired
};

If.defaultProps = {
  condition: false
};

var Else = function Else(props) {
    if (typeof props.condition !== "undefined") console.warn("Else cannot contain a condition, The condition is ignored.");
    return props.children;
};

var ElseIf = function ElseIf(props) {
  return props.children;
};

ElseIf.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired
};

ElseIf.defaultProps = {
  condition: false
};

var hasValidChildren = function hasValidChildren(children) {
  // If multiple children
  // - All children should be one of 'If', 'Else', 'ElseIf'.
  // - First child should be 'If'.
  // - Else should only be used once.
  // - Else should be used at last.
  // If only one child
  // - It must be 'If'

  if (!children) {
    console.warn("No Children found, Decide must contain at least one 'If' Component as child component.");
    return false;
  }

  if (Array.isArray(children) && children.length > 0) {
    if (!children.every(function (child) {
      return child.type === If || child.type === Else || child.type === ElseIf;
    })) {
      console.error("Invalid children found, Child for 'Decide' should be one of 'If', 'Else', 'ElseIf'.");
      return false;
    }
    var elseChildren = children.filter(function (child) {
      return child.type === Else;
    });
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
    if (children[0].type === If) return true;else {
      console.error("First Children must be an 'If' component");
      return false;
    }
  } else {
    if (children.type === If) return true;else {
      console.error("First Children must be an 'If' component");
      return false;
    }
  }
};

var evaluateChildren = function evaluateChildren(children) {
  if (Array.isArray(children) && children.length > 0) {
    var trutyChild = children.find(function (child) {
      return evaluateConditionProp(child.props.condition);
    });
    if (trutyChild) {
      return trutyChild;
    } else {
      var lastChild = children[children.length - 1];
      return lastChild.type === Else ? lastChild : null;
    }
  } else {
    return typeof children.props.condition !== "undefined" && evaluateConditionProp(child.props.condition) ? children : null;
  }
};

var evaluateConditionProp = function evaluateConditionProp(condition) {
  return isFunction(condition) ? condition() : condition;
};

var Decide = function Decide(props) {
  if (!hasValidChildren(props.children)) return null;
  return evaluateChildren(props.children);
};

Decide.propTypes = {};

exports.Decide = Decide;
exports.If = If;
exports.Else = Else;
exports.ElseIf = ElseIf;
