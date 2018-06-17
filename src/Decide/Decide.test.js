import React from "react";
import { shallow, mount, render } from "enzyme";

import { Decide, If, Else, ElseIf } from "../index";

describe("'Decide' component Tests", () => {
  it("If no children passed to Decide", () => {
    let wrapper = <Decide />;

    expect(shallow(wrapper).isEmptyRender()).toBeTruthy();

    expect(global.console.warn).toBeCalledWith(
      "No Children found, Decide must contain at least one 'If' Component as child component."
    );
  });

  it("If no children other than 'If', 'Else', 'ElseIf' passed to Decide", () => {
    let wrapper = (
      <Decide>
        <p>"Hello World!"</p>
      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError("First Children must be an 'If' component");
  });

  it("If only 'Else' is passed to Decide", () => {
    let wrapper = (
      <Decide>
        <Else>Hello World!</Else>
      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError("First Children must be an 'If' component");
  });

  it("If other children are passed to decide", () => {
    let wrapper = (
      <Decide>
        <If>Hello World!</If>
        <p>Paragraph to Fail</p>
      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError(
      "Invalid children found, Child for 'Decide' should be one of 'If', 'Else', 'ElseIf'."
    );
  });

  it("If other children are passed to decide", () => {
    let wrapper = (
      <Decide>
        <ElseIf>Hello World!</ElseIf>
        <If>Hello World!</If>

      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError("First Children must be an 'If' component");
  });

  it("If 'Else' is used before 'ElseIf'", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>Hello World!</If>
        <Else>Hello World!</Else>
        <ElseIf condition={true}>Hello World!</ElseIf>
      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError("Else should be used at last.");
  });

  it("If 'Else' is used more than once.", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>Hello World!</If>
        <Else>Hello World!</Else>
        <Else>Hello World!</Else>
      </Decide>
    );
    expect(() => {
      shallow(wrapper);
    }).toThrowError("Else should be used only once.");
  });

  it("If only 'If' is passed to Decide with true as value", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>Hello World!</If>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(
      <If condition={true}>Hello World!</If>
    );
  });

  it("If multiple 'If' are used", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>Hello World!</If>
        <If condition={true}>Hello World!</If>
      </Decide>
    );
    expect(() => shallow(wrapper)).toThrowError(
      "'If' should be used only once."
    );
  });

  it("If all the elements are False", () => {
    let wrapper = (
      <Decide>
        <If condition={false}>Hello World!</If>
        <ElseIf condition={false}>Hello World!</ElseIf>
      </Decide>
    );
    expect(shallow(wrapper).isEmptyRender()).toBeTruthy();
  });

  it("'If' and 'ElseIf' are used", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>Hello World!</If>
        <ElseIf condition={true}>Hello World!</ElseIf>
      </Decide>
    );
    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(
      <If condition={true}>Hello World!</If>
    );
  });

  it("If only 'If' is passed to Decide with false as value", () => {
    let wrapper = (
      <Decide>
        <If condition={false}>Hello World!</If>
      </Decide>
    );
    expect(shallow(wrapper).isEmptyRender()).toBeTruthy();
  });

  it("If only 'If' is passed to Decide with truthy callback function", () => {
    let truthyFunction = jest.fn().mockReturnValue(true);
    let wrapper = (
      <Decide>
        <If condition={truthyFunction}>Hello World!</If>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(
      <If condition={truthyFunction}>Hello World!</If>
    );
  });

  it("If only 'If' is passed to Decide with falsy callback function", () => {
    let falsyFunction = jest.fn().mockReturnValue(false);
    let wrapper = (
      <Decide>
        <If condition={falsyFunction}>Hello World!</If>
      </Decide>
    );
    expect(shallow(wrapper).isEmptyRender()).toBeTruthy();
  });

  it("If 'If' and 'Else' is passed to Decide and 'If' is true", () => {
    let wrapper = (
      <Decide>
        <If condition={true}>If Statement</If>
        <Else>Else Statement</Else>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(
      <If condition={true}>If Statement</If>
    );
  });

  it("If 'If' and 'Else' is passed to Decide and 'If' is false", () => {
    let wrapper = (
      <Decide>
        <If condition={false}>If Statement</If>
        <Else>Else Statement</Else>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(<Else>Else Statement</Else>);
  });

  it("If 'If' and 'Else' is passed to Decide and 'If' is false", () => {
    let wrapper = (
      <Decide>
        <If condition={false}>If Statement</If>
        <Else>Else Statement</Else>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(<Else>Else Statement</Else>);
  });

  it("If 'If' and 'Else' is passed to Decide and 'If' is false and Else has a condition prop", () => {
    let wrapper = (
      <Decide>
        <If condition={false}>If Condition</If>
        <Else condition={false}>Else Condition</Else>
      </Decide>
    );

    expect(shallow(wrapper).isEmptyRender()).toBeFalsy();
    expect(shallow(wrapper).getElement()).toEqual(
      <Else condition={false}>Else Condition</Else>
    );
  });
});
