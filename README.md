# react-decide

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/inf3cti0n95/react-decide.svg?branch=master)](https://travis-ci.org/inf3cti0n95/react-decide)
[![npm](https://img.shields.io/npm/v/react-decide.svg)](https://www.npmjs.com/package/react-decide)

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