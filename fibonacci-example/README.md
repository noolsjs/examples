# Fibonacci Examples

This set of examples revolves around the `agenda-group option`.

* [`fibonacci-dsl-example`](#fibonacci-dsl-example)
* [`fibonacci-programmatic-example`](#fibonacci-programmatic-example)

Both of the examples declare the same set of rules.

1. `Recurse` - This rule creates a `Fibonacci` instance for each number up to the calculated value (e.g. 1,2,3,4,5,6,7,8,9,10)
2. `Bootstrap` - This rule looks for any `Fibonacci` instance that have a value equal to -1 and a sequence of 1 or 2 and sets it to 1.
3. `Calculate` - This rule looks for the subsequent Fibonacci instances (`f1`, `f2`, `f3`) with `f3` not being calculated. This rule will used the values of `f1` and `f2` added together to calculate the value of `f3`.

For example given the number `5` to  calculate the rules will fire in this order.

```
Recurse f1: Fibonacci { sequence: 5, value: -1 } } // asserts Fibonacci { sequence: 4, value: -1 }
Recurse f1: Fibonacci { sequence: 4, value: -1 } } // asserts Fibonacci { sequence: 3, value: -1 }
Recurse f1: Fibonacci { sequence: 3, value: -1 } } // asserts Fibonacci { sequence: 2, value: -1 }
Recurse f1: Fibonacci { sequence: 2, value: -1 } } // asserts Fibonacci { sequence: 1, value: -1 }
Bootstrap f: Fibonacci { sequence: 1, value: -1 } } // modifies f.value = 1
Bootstrap f: Fibonacci { sequence: 2, value: -1 } } // modifies f.value = 1
Calculate // modifies f3 by setting the value to 2
  f1: Fibonacci { sequence: 1, value: 1 },
  f2: Fibonacci { sequence: 2, value: 1 },
  f3: Fibonacci { sequence: 3, value: -1 },
Calculate // modifies f3 by setting the value to 3
  f1: Fibonacci { sequence: 2, value: 1 },
  f2: Fibonacci { sequence: 3, value: 2 },
  f3: Fibonacci { sequence: 4, value: -1 }
Calculate // modifies f3 by setting the value to 5
  f1: Fibonacci { sequence: 3, value: 2 },
  f2: Fibonacci { sequence: 4, value: 3 },
  f3: Fibonacci { sequence: 5, value: -1 }

```


## `fibonacci-dsl-example`

To run this example run the following command in the root of the project.

```sh
npm run fibonacci:fibonacci-dsl-example
```

Expected Output:

```
fibonacci-dsl-example: Example 1 - [number=10] [result=55]
```

## `fibonacci-programmatic-example`

```sh
npm run fibonacci:fibonacci-programmatic-example
```

Expected Output:

```
fibonacci-programmatic-example: Example 1 - [number=10] [result=55]
```


