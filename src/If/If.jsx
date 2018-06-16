import PropTypes from "prop-types";

const If = props => props.children;

If.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired
};

If.defaultProps = {
  condition: false
};

export default If;
