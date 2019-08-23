# ➕ts-declaration-gen

<details>
<summary>中文</summary>

## 📺背景
写ts的时候，总是知道了一个数据结构，但要一行行地写类型，很麻烦，因此做了一个小工具解决此问题

## 🔧使用
```javascript
declarationGen({ a: 1 })
/*
{
  a: number;
}
*/

declarationGen({
  "a": 1,
  "b": "1",
  "c": {
    "d": 1,
    "e": [
      "1",
      {
        "g": 1,
        "r": "asd",
        "gg": true
      },
      1
    ]
  }
})
/*
{
  a: number;
  b: string;
  c: {
    d: number;
    e: number | {
      g: number;
      r: string;
      gg: boolean;
    } | string [];
  };
}
*/
```

</details>

<details>
<summary>english</summary>


## 📺background
when writing typescript,we have allready known a json.however,we must write the declaration line and line,that's so difficult.so,there is a little tool to fix it.

## 🔧usage
```javascript
declarationGen({ a: 1 })
/*
{
  a: number;
}
*/

declarationGen({
  "a": 1,
  "b": "1",
  "c": {
    "d": 1,
    "e": [
      "1",
      {
        "g": 1,
        "r": "asd",
        "gg": true
      },
      1
    ]
  }
})
/*
{
  a: number;
  b: string;
  c: {
    d: number;
    e: number | {
      g: number;
      r: string;
      gg: boolean;
    } | string [];
  };
}
*/
```

</details>
