const Else = props => {
    if(typeof props.condition !== "undefined")
        console.warn("Else cannot contain a condition, The condition is ignored.")
    return props.children
};

export default Else;