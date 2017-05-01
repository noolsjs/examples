# Agenda Examples

This set of examples revolves around the `agenda-group option`.

* [`agenda-example`](#agenda-example)
* [`agenda-programmatic-example`](#agenda-programmatic-example)
* [`focus-example`](#focus-example)

## `agenda-example`

To run these example run the following command in the root of the project.

```sh
npm run agenda:agenda-example
```

### Example 1

In this example only the `ag1` agenda group is focused so only one rule will fire ('Agenda Group 1').

Expected output:

```
agenda-example: Example 1 [ 'Agenda Group 1' ]
```

### Example 2

In this example `ag1` is focused first then `ag2` is focused immediately after.

**Note** Agenda groups are stack based so `Agenda Group 2` will fire first because its agenda-group is `ag2` then `Agenda Group 1` will fire.

Expected output:

```
agenda-example: Example 2 [ 'Agenda Group 2', 'Agenda Group 1' ]
```

### Example 3

In this example `ag2` is focused first then `ag1` is focused immediately after.

**Note** Agenda groups are stack based so `Agenda Group 1` will fire first because its agenda-group is `ag1` then `Agenda Group 2` will fire.

Expected output:
```
agenda-example: Example 3 [ 'Agenda Group 1', 'Agenda Group 2' ]
```


## `agenda-programmatic-example`

To run these example run the following command in the root of the project.

```sh
npm run agenda:agenda-programmatic-example
```

### Example 1

In this example only the `ag1` agenda group is focused so only one rule will fire ('Agenda Group 1').

Expected output:

```
agenda-example: Example 1 [ 'Agenda Group 1' ]
```

### Example 2

In this example only the `ag2` agenda group is focused so only one rule will fire ('Agenda Group 2').

Expected output:

```
agenda-programmatic-example: Example 2 [ 'Agenda Group 2' ]
```

### Example 3

In this example `ag2` is focused first then `ag1` is focused immediately after.

**Note** Agenda groups are stack based so `Agenda Group 1` will fire first because its agenda-group is `ag1` then `Agenda Group 2` will fire.

Expected output:

```
agenda-programmatic-example: Example 3 [ 'Agenda Group 1', 'Agenda Group 2' ]
```

### Example 4

In this example `ag1` is focused first then `ag2` is focused immediately after.

**Note** Agenda groups are stack based so `Agenda Group 2` will fire first because its agenda-group is `ag2` then `Agenda Group 1` will fire.

Expected output:

```
agenda-programmatic-example: Example 4 [ 'Agenda Group 2', 'Agenda Group 1' ]
```

## `focus-example`

To run these example run the following command in the root of the project.

```sh
npm run agenda:docus-example
```

### Example 1

In this example we create a simple state machine that makes use of `focus` and `auto-focus`

The `Bootstrap` rule will run first as it is part of the default agenda group. As part of its action it modifies fact `a` state to finished, which in turn causes the rule `A to B` to fire.

Once `A to B` fires `B to C` comes into focus because of the `auto-focus` flag.

In the action of `B to C` focus('B to D') is invoked which puts that agenda group at the top of the stack and it will run next.

Expected output:
```
focus-example: Example 1 [ 'Bootstrap', 'A to B', 'B to C', 'B to D' ]
```