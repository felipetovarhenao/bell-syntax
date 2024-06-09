import * as vscode from "vscode";

export const nativeFunctions = [
  {
    name: "apply",
    description:
      "The `apply()` function calls another function by passing it individual parameters expressed as two lllls, one for arguments passed by position, the other for arguments passed by name.",
    args: [
      {
        name: "function",
      },
      {
        name: "argsbyposition",
      },
      {
        name: "argsbyname",
      },
    ],
  },
  {
    name: "abs",
    description: "The `abs()` function returns the absolute value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "acos",
    description: "The `acos()` function returns the arc cosine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "acosh",
    description: "The `acosh()` function returns the inverse hyperbolic cosine of `@x`",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "alter",
    description:
      "The `alter()` function returns the difference, in tones, between the pitch value of `@x` and its diatonic pitch name. For instance:\n\n```bell\nalter(Db4) -> -1/2\n```",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "asin",
    description: "The `asin()` function returns the arc sine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "asinh",
    description: "The `asinh()` function returns the hyperbolic arc sine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "atan",
    description: "The `atan()` function returns the arc tangent value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "atanh",
    description: "The `atanh()` function returns the hyperbolic arc tangent value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "ceil",
    description: "The `ceil()` function rounds up the value of `@x` to the nearest integer.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "cents",
    description: "The `cents()` function converts the value of `@x` to midicents.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "cos",
    description: "The `cos()` function returns the cosine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "cosh",
    description: "The `cosh()` function returns the hyperbolic cosine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "degree",
    description: "Midicents to C-based diatonic scale degree conversion.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "den",
    description: "The `den()` function returns the denominator of `@x`",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "exp",
    description: "The `exp()` function raises the constant `e` (`~2.71828`) to the power of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "exp2",
    description: "The `exp2()` function raises 2 to the power of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "float",
    description: "The `float()` function casts value of `@x` as a `float`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "floor",
    description: "The `floor()` function rounds down the value of `@x` to the nearest integer.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "int",
    description: "The `int()` function casts value of `@x` as an `int`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "log",
    description: "Natural logarithm",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "log10",
    description: "Logarithm base 10",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "log2",
    description: "Logarithm base 2",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "num",
    description: "The `num()` function returns the numerator of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "octave",
    description: "The `octave()` function returns the pitch octave level of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "pitch",
    description: "The `pitch()` function casts value of `@x` as `pitch`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "rat",
    description: "The `rat()` function casts value of `@x` as `rat`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "round",
    description: "The `round()` function rounds the value of `@x` to the nearest integer.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "sgn",
    description: "The `sgn` function returns the sign of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "sin",
    description: "The `sin()` function returns the sine value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "sinh",
    description: "The `sin()` function returns the hyperbolic sine of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "sqrt",
    description: "The `sqrt()` function returns the square root of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "tan",
    description: "The `tan()` function returns the tangent of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "tanh",
    description: "The `tan()` function returns the hyperbolic tangent of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "trunc",
    description: "The `trunc()` function truncates the value of `@x`.",
    args: [
      {
        name: "x",
      },
    ],
  },
  {
    name: "atan2",
    description: "The `atan2()` function returns the arctangent of `@x` and `@y`.",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "enharm",
    description: "`enharm()` function",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "fmod",
    description: "The `fmod()` function returns `@x` modulo `@y`",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "hypot",
    description: "The `hypot()` returns the hypotenuse of `@x` and `@y`",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "max",
    description: "The `max()` function returns the maximum value between `@x` an `@y`. ",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "min",
    description: "The `min()` function returns the minimum value between `@x` an `@y`. ",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "mod",
    description: "The `mod()` function returns `@x` modulo `@y`",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "random",
    description: "The `random()` function generates a random integer between `@x` and `@y`.",
    args: [{ name: "x" }, { name: "y" }],
  },
  {
    name: "approx",
    description: "The `approx()` function approximates a pitch value to the nearest tone division",
    args: [{ name: "pitch" }, { name: "tonedivision" }],
  },
  {
    name: "bessel",
    description: "`bessel()` function",
    args: [{ name: "x" }, { name: "order" }],
  },
  {
    name: "makepitchsc",
    description:
      "The `makepitchsc()` function generates a pitch, given a number of `@steps` along the C-based diatonic scale, and the desired midicent value.",
    args: [{ name: "steps" }, { name: "cents" }],
  },
  {
    name: "pow",
    description: "The `pow()` function returns the value of `@base` to the power of `@exponent`.",
    args: [{ name: "base" }, { name: "exponent" }],
  },
  {
    name: "makepitch",
    description: "The `makepitch()` generates a `pitch` value, given a `@degree`, `@octave`, and `@alter`",
    args: [{ name: "degree" }, { name: "octave" }, { name: "alter" }],
  },
  {
    name: "arithmser",
    description: "The `arithmser()` function return an arithmetic series, like the `bach.arithmser` object.",
    args: [
      {
        name: "start",
        default: null,
      },
      {
        name: "end",
        default: null,
      },
      {
        name: "step",
        default: 1,
      },
      {
        name: "maxcount",
        default: 0,
      },
    ],
  },
  {
    name: "cartesianprod",
    description: "The `cartesianprod()` function returns the cartesian product of the sublists of an llll.",
    args: [
      {
        name: "llll",
      },
    ],
  },
  {
    name: "classify",
    description:
      "The `classify()` function arranges elements into classes, like the `bach.classify` object. When `@function` is `null`, it uses the default comparison function.",
    args: [
      {
        name: "llll",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "comb",
    description: "The `comb()` function returns all the k-combinations of an llll for a range of k, like the `bach.comb` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "kstart",
        default: 0,
      },
      {
        name: "kend",
        default: "none",
      },
      {
        name: "maxcount",
        default: 0,
      },
    ],
  },
  {
    name: "contains",
    description:
      "The `contains()` function returns a summary of the data types contained in an llll, like the `bach.contains` object. The return value is encoded as a bit field, with the following values:\n\n- `1`: null\n- `2`: integer\n- `4`: rational\n- `8`: double\n- `16`: symbol\n- `32`: sublist\n- `256`: pitch.\n\nBy default, only the contents of the root level are considered. This can be changed with the `@mindepth` and `@maxdepth` arguments.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "delace",
    description: "The `delace()` function deinterlaces an llll into a given number of lllls, like the `bach.delace` object in mono mode.",
    args: [
      {
        name: "llll",
      },
      {
        name: "count",
        default: 2,
      },
    ],
  },
  {
    name: "depth",
    description: "The `depth()` function returns the depth of an llll, like the `bach.depth` object.",
    args: [
      {
        name: "llll",
      },
    ],
  },
  {
    name: "diff",
    description:
      "The `diff()` function returns the set difference of two lllls, like the `bach.diff` object. A comparison function can be provided through the `@function` argument, otherwise it performs a stardard comparison.",
    args: [
      {
        name: "llll1",
      },
      {
        name: "llll2",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "directin",
    description:
      "The `directin()` function receives data during evaluation from one direct inlet. It is useful for setting up lambda loops. Unlike what happens with its corresponding pseudovariables `$di<n>`, providing code containing the `directout()` function does not create automatically the direct inlet. For this reason, it is generally necessary to set the `@directins` object argument.",
    args: [
      {
        name: "inlet",
      },
    ],
  },
  {
    name: "directout",
    description:
      "The `directout()` function outputs data from one or more direct outlets. The data are output as the function is evaluated. The return value of `directout()` is the last llll output. Unlike what happens with its corresponding pseudovariables `$do<n>`, providing code containing the `directout()` function does not create automatically the direct outlets. For this reason, it is generally necessary to set the `@directouts` object argument.",
    args: [
      {
        name: "outlets",
      },
      {
        name: "<...>",
      },
    ],
  },
  {
    name: "f2mc",
    description:
      "The `f2mc()` function converts all the numbers in an llll from frequency to midicents, with optional reference frequency and pitch.",
    args: [
      {
        name: "llll",
      },
      {
        name: "basefreq",
        default: 440,
      },
      {
        name: "basepitch",
        default: 6900,
      },
    ],
  },
  {
    name: "find",
    description:
      "The `find()` function retrieves items from an llll, along with their addresses, like the `bach.find` object. The return value is an `llll` composed by two sublists, the first containing the retrieved items, the second containing the addresses. An equality comparison function can be provided through the `@function` argument, otherwise it performs a stardard comparison.",
    args: [
      {
        name: "llll",
      },
      {
        name: "items",
        default: null,
      },
      {
        name: "function",
        default: null,
      },
      {
        name: "size",
        default: null,
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "minidx",
        default: 1,
      },
      {
        name: "maxidx",
        default: 1,
      },
      {
        name: "idxreject",
        default: 0,
      },
      {
        name: "depthreject",
        default: 0,
      },
      {
        name: "maxcount",
        default: 0,
      },
      {
        name: "unwrap",
        default: 0,
      },
      {
        name: "depthpolicy",
        default: 0,
      },
      {
        name: "recursive",
        default: 0,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "findaddrs",
    description:
      "The `findaddrs()` function retrieves the addresses of items from an llll, like the `bach.find` object. An equality comparison function can be provided through the `@function` argument, , otherwise it performs a stardard comparison.",
    args: [
      {
        name: "llll",
      },
      {
        name: "items",
        default: null,
      },
      {
        name: "function",
        default: null,
      },
      {
        name: "size",
        default: null,
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "minidx",
        default: 1,
      },
      {
        name: "maxidx",
        default: 1,
      },
      {
        name: "idxreject",
        default: 0,
      },
      {
        name: "depthreject",
        default: 0,
      },
      {
        name: "maxcount",
        default: 0,
      },
      {
        name: "depthpolicy",
        default: 0,
      },
      {
        name: "recursive",
        default: 0,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "finditems",
    description:
      "The `finditems()` function retrieves items from an llll, like the `bach.find` object. The return value is an llll composed by the retrieved items. An equality comparison function can be provided through the `@function` argument, , otherwise it performs a stardard comparison.",
    args: [
      {
        name: "llll",
      },
      {
        name: "items",
        default: null,
      },
      {
        name: "function",
        default: null,
      },
      {
        name: "size",
        default: null,
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "minidx",
        default: 1,
      },
      {
        name: "maxidx",
        default: 1,
      },
      {
        name: "idxreject",
        default: 0,
      },
      {
        name: "depthreject",
        default: 0,
      },
      {
        name: "maxcount",
        default: 0,
      },
      {
        name: "unwrap",
        default: 0,
      },
      {
        name: "depthpolicy",
        default: 0,
      },
      {
        name: "recursive",
        default: 0,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "flat",
    description: "The `flat()` function flattens depth levels of an llll, like the `bach.flat` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "level",
        default: null,
      },
      {
        name: "spikemode",
        default: 0,
      },
      {
        name: "minlevel",
        default: 1,
      },
      {
        name: "maxlevel",
        default: -1,
      },
    ],
  },
  {
    name: "geomser",
    description: "The `geomser()` function return a geomethric series, like the `bach.arithmser` object.",
    args: [
      {
        name: "start",
        default: null,
      },
      {
        name: "end",
        default: null,
      },
      {
        name: "factor",
        default: null,
      },
      {
        name: "maxcount",
        default: 0,
      },
    ],
  },
  {
    name: "group",
    description: "The `group()` function groups elements in sublists according to a regular size pattern, like the `bach.group` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "modulos",
        default: 1,
      },
      {
        name: "overlap",
        default: 0,
      },
    ],
  },
  {
    name: "inlet",
    description:
      'The `inlet()` function returns the number of the inlet that triggered the computation. This is always 1, unless you set the "triggers" attribute to a different value. If the computation has been triggered by a trigger variable, rather than an inlet, the function returns 0.',
    args: [],
  },
  {
    name: "insert",
    description: "The `insert()` function inserts one or more elements in a list according to their positions, like the `bach.insert` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "address",
        default: 1,
      },
      {
        name: "model",
        default: null,
      },
      {
        name: "multi",
        default: 0,
      },
      {
        name: "sizes",
        default: 0,
      },
    ],
  },
  {
    name: "intersection",
    description: "The `intersection()` function returns the intersection of two lllls, like the `bach.intersection` object",
    args: [
      {
        name: "llll1",
      },
      {
        name: "llll2",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "is",
    description:
      "The `is()` function returns the data type of the input, as one of the following symbols:\n\n- `integer`\n- `real`\n- `rational`\n- `symbol`\n- `llll`\n- `pitch`\n- `function`",
    args: [{ name: "llll" }],
  },
  {
    name: "left",
    description: "The `left()` function returns the left part of an llll relative to an index.",
    args: [
      {
        name: "llll",
      },
      {
        name: "index",
        default: 1,
      },
    ],
  },
  {
    name: "length",
    description: "The `length()` function returns the number of elements in the root level of an llll.",
    args: [
      {
        name: "llll",
      },
    ],
  },
  {
    name: "map",
    description:
      "The `map()` function transforms an llll element-wise, according to a given lambda function, like the `bach.mapelem` object. The modification function actually receives three arguments: the element to be modified, its address in the original llll and its address in the new llll—the two may be different, as the modification function can remove or insert new elements. If a sublist is encountered and maxdepth has not been received yet, it is possible to choose whether to enter it and run pass the modification function its elements one by one, or pass the whole sublist. This is accomplished through the `@askfunction` argument, that can be set to a function receiving the same arguments as the modification function.",
    args: [
      {
        name: "llll",
      },
      {
        name: "modfunction",
        default: null,
      },
      {
        name: "askfunction",
        default: null,
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "maximum",
    description:
      "The `maximum()` function returns the smallest number in an llll. According to the `@mindepth` and `@maxdepth` parameters, data in sublists are considered or not.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "mc2f",
    description:
      "The `mc2f()` function converts all the numbers (considered as midicents) and pitches in an llll to frequency, with optional reference frequency and pitch.",
    args: [
      {
        name: "llll",
      },
      {
        name: "basefreq",
        default: 440,
      },
      {
        name: "basepitch",
        default: 6900,
      },
    ],
  },
  {
    name: "minimum",
    description:
      "The `minimum()` function returns the smallest number in an llll. According to the `@mindepth` and `@maxdepth` parameters, data in sublists are considered or not.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "minmax",
    description:
      "The `minmax()` function returns an llll composed of four elements, respectively the minimum value in the llll, its address, the maximum value and its address. According to the `@mindepth` and `@maxdepth` parameters, data in sublists are considered or not.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "nth",
    description:
      "The `nth()` function returns one or more elements from an llll according to its address, like the `bach.nth` object (and supporting its full address syntax). If a placeholder is provided, it will be inserted in the place of non-existing elements.",
    args: [
      {
        name: "llll",
      },
      {
        name: "address",
        default: 1,
      },
      {
        name: "placeholder",
        default: null,
      },
    ],
  },
  {
    name: "outlet",
    description:
      "The `outlet()` function assigns values to extra outlets, and returns the last (or only) value assigned. The order of the assigned values has no influence on the order in which they will be output, which will always be right-to-left, except if the same outlet is assigned more than one llll—in this case, the last assignment is the one that is retained. The same goes if the `outlet()` function is called more than once. If the `outlet()` function is called from a non-main function, it produces no effect besides returning the last argument's value.",
    args: [
      {
        name: "outlets",
      },
      {
        name: "<...>",
      },
    ],
  },
  {
    name: "perm",
    description: "The `perm()` function returns one or more distinct permutations of an llll, like the `bach.perm` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "maxcount",
        default: 0,
      },
    ],
  },
  {
    name: "primeser",
    description: "The `primeser()` function return sequences of primes, like the `bach.primeser` object",
    args: [
      {
        name: "min",
        default: -1,
      },
      {
        name: "max",
        default: -1,
      },
      {
        name: "maxcount",
        default: 0,
      },
    ],
  },
  {
    name: "print",
    description:
      "The `print()` function prints an llll in the Max console, like the `bach.print` object. The return value is the llll that has been printed.",
    args: [
      {
        name: "llll",
      },
      {
        name: "prepend",
      },
      {
        name: "maxdecimals",
        default: 6,
      },
      {
        name: "error",
        default: 0,
      },
    ],
  },
  {
    name: "prod",
    description:
      "The `prod()` function computes the product of the elements in an llll. By default, products are computed only the root level. This can be changed with the `@mindepth` and `@maxdepth` arguments.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "reduce",
    description: "The `reduce()` applies cumulatively a binary function to all the elements in an llll, like the `bach.reduce` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "function",
      },
    ],
  },
  {
    name: "rev",
    description:
      "The `rev()` function reverses the contents of an llll, like the `bach.rev` object. By default, only the root level is changed. This can be changed with the `@mindepth` and `@maxdepth` arguments.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "right",
    description: "The `right()` function returns the right part of an llll relative to an index.",
    args: [
      {
        name: "llll",
      },
      {
        name: "index",
        default: -1,
      },
    ],
  },
  {
    name: "rot",
    description:
      "The `rot()` function rotates the contents of an llll, like the `bach.rot` object. By default, only the root level is changed. This can be changed with the mindepth and maxdepth arguments.",
    args: [
      {
        name: "llll",
      },
      {
        name: "shift",
        default: 1,
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "scramble",
    description: "The `scramble()` function shuffles randomly the elements of an llll, like the `bach.scramble` object",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "slice",
    description: "The `slice()` function divides an llll into two sublists according to a split point.",
    args: [
      {
        name: "llll",
      },
      {
        name: "index",
        default: 1,
      },
    ],
  },
  {
    name: "sort",
    description: "The `sort()` function sorts an llll, like the `bach.sort` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "subs",
    description: "The `subs()` function substitutes one or more elements of a list according to their positions, like the `bach.subs` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "address",
        default: 1,
      },
      {
        name: "model",
        default: null,
      },
      {
        name: "multi",
        default: 0,
      },
      {
        name: "sizes",
        default: 0,
      },
    ],
  },
  {
    name: "sums",
    description:
      "The `sum()` function computes the sum of the elements in an llll. By default, only the root level is summed. This can be changed with the mindepth and maxdepth arguments.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depth",
        default: null,
      },
      {
        name: "mindepth",
        default: 1,
      },
      {
        name: "maxdepth",
        default: 1,
      },
    ],
  },
  {
    name: "symdiff",
    description:
      "The `symdiff()` function returns the symmetric difference of two lllls, like the `bach.symdiff` object. A comparison function can be provided through the `@function` argument, otherwise it performs a stardard comparison",
    args: [
      {
        name: "llll1",
      },
      {
        name: "llll2",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "thin",
    description: "The `thin()` function removes the duplicates from an llll, like the `bach.thin` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "trans",
    description: "The `trans()` function returns the matrix transposition of an llll, like the `bach.trans` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "depths",
        default: 1,
      },
      {
        name: "iterationmode",
        default: 1,
      },
    ],
  },
  {
    name: "union",
    description: "The `union()` function returns the union of two lllls, like the `bach.union` object.",
    args: [
      {
        name: "llll1",
      },
      {
        name: "llll2",
      },
      {
        name: "function",
        default: null,
      },
    ],
  },
  {
    name: "wrap",
    description: "The `wrap()` function wraps an llll in parentheses, thus raising its overall depth, like the `bach.wrap` object.",
    args: [
      {
        name: "llll",
      },
      {
        name: "levels",
        default: 1,
      },
    ],
  },
  {
    name: "include",
    description:
      "The `include()` directive imports a bell file into the script. As a directive, the file path must be given without single or double quotes.",
    args: [
      {
        name: "file",
      },
    ],
  },
];

const nativeFunctionsLookup: any = {};

const nativeFunctionsCompletions = nativeFunctions.map((x) => {
  // we set code-style function name as a header
  let description = `\`\`\`c\n${x.name}()\n\`\`\`\n`;

  const argCompletions: vscode.CompletionItem[] = [];
  // parse arguments
  if (x.args.length > 0) {
    // argument list
    description += `\nArguments:\n`;
    x.args.forEach((arg, index) => {
      // argument as a list item, prepended with @ when not variadic
      let argname = `\n\t- ${arg.name === "<...>" ? arg.name : `@${arg.name}`}`;

      let defaultValue = undefined;

      // append default value, if any
      if (arg.default != undefined || arg.default === null) {
        defaultValue = arg.default === null ? "null" : arg.default;
        argname += ` ${defaultValue}`;
      }

      // concat to description
      description += argname;

      // stop early if arg is variadic
      if (arg.name === "<...>") {
        return;
      }
      // create arg completion
      const argCompletion = new vscode.CompletionItem(`@${arg.name}`, vscode.CompletionItemKind.Field);
      argCompletion.insertText = new vscode.SnippetString(`${arg.name} `);
      argCompletion.filterText = arg.name;
      argCompletion.sortText = `${index}`;
      if (defaultValue != undefined) {
        argCompletion.label += ` ${defaultValue}`;
        argCompletion.insertText.appendVariable("1", `${defaultValue}`);
      }

      argCompletions.push(argCompletion);
    });
  }

  // include description
  description += `\n${x.description}\n\n`;

  // instantiate completion item
  const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Function);
  item.insertText = new vscode.SnippetString(`${x.name}(\${1})`);
  item.detail = "bell function";
  const docs = new vscode.MarkdownString(description);
  item.documentation = docs;

  nativeFunctionsLookup[x.name] = {
    completion: item,
    args: argCompletions,
  };

  return item;
});

export { nativeFunctionsCompletions, nativeFunctionsLookup };
