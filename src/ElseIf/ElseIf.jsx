import PropTypes from "prop-types";

const ElseIf = props => props.children;

ElseIf.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired
};

ElseIf.defaultProps = {
  condition: false
};
export default ElseIf;
