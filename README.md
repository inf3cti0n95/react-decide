# react-decide

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

React Component to make the Conditional Render look Elegant.

A Cleaner, Better way of writing conditional statements in React.

## Installation

```
yarn add react-decide

or

npm install --save react-decide

```

## Usage


```
<Decide>
    <If condition={false}>
        // Render on If Condition
    </If>

    <ElseIf condition={() => {
            //Do Something 
            return false;
        }}>
        // Render on ElseIf Condition
    </ElseIf>

    <Else>
        // Render on If Condition
    </Else>
</Decide>

```