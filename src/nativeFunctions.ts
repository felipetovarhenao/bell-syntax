import * as vscode from "vscode";

export const nativeFunctions = [
  // {
  //   name: "apply",
  //   description:
  //     "The `apply()` function calls another function by passing it individual parameters expressed as two lllls, one for arguments passed by position, the other for arguments passed by name.",
  //   args: [
  //     {
  //       name: "function",
  //     },
  //     {
  //       name: "arguments",
  //     },
  //     {
  //       name: "arguments",
  //     },
  //   ],
  // },
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
      "The `directout()` function outputs data from one or more direct outlets. The data are output as the function is evaluated. The return value of `directout()` is the last llll output. Unlike what happens with its corresponding pseudovariables `$do<n>`, providing code containing the `directout()` function does not create automatically the direct outlets. For this reason, it is generally necessary to set the @directouts object argument.",
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
    description: "The geomser() function return a geomethric series, like the `bach.arithmser` object.",
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
      "The `is()` function returns the data type of the input, as one of the following symbols:\n\n- `integer`\n- `real`\n- `rational`\n- `symbol`\n- `llll`\n- `function`",
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
      "The `outlet()` function assigns values to extra outlets, and returns the last (or only) value assigned. The order of the assigned values has no influence on the order in which they will be output, which will always be right-to-left, except if the same outlet is assigned more than one llll—in this case, the last assignment is the one that is retained. The same goes if the outlet() function is called more than once. If the outlet() function is called from a non-main function, it produces no effect besides returning the last argument's value.",
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
        name: "outlets",
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
    description: "The trans() function returns the matrix transposition of an llll, like the `bach.trans` object.",
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

  // parse arguments
  if (x.args.length > 0) {
    // argument list
    description += `\nArguments:\n`;
    x.args.forEach((arg) => {
      // argument as a list item, prepended with @ when not variadic
      let argname = `\n\t- ${arg.name === "<...>" ? arg.name : `@${arg.name}`}`;

      // provide default value, if any
      if (arg.default != undefined || arg.default === null) {
        argname += ` ${arg.default === null ? "null" : arg.default}`;
      }

      // concat to description
      description += argname;
    });
  }

  // include description
  description += `\n${x.description}\n\n`;

  // instantiate completion item
  const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Function);
  item.insertText = new vscode.SnippetString(`${x.name}(\${1})`);
  const docs = new vscode.MarkdownString(description);
  item.documentation = docs;
  nativeFunctionsLookup[x.name] = item;
  return item;
});

export { nativeFunctionsCompletions, nativeFunctionsLookup };
