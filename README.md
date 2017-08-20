## 使用 yargs
yargs 是 node 自带的 **`process.argv`** 的增强版，实现了很多有用的功能，对命令行的参数进行解析，和提供一些其它的配置选项

```
const yargs = require('yargs');

const argv = yargs.argv;
```

如果我们使用下面命令行
```
node app.js add --title="this is note title" --body="this is note body"

// 打印一下argv 可以得到
console.log('Yargs argv', argv)

Yargs argv  { _: [ 'add' ],
  title: 'this is note title',
  body: 'this is note body',
  '$0': 'app' }
```
其中
```
var command = argv._[0] // 可以表示命令 'add'

'--title'， '--body' 表示的其它的参数
```

另外我们可以使用 **`command()`** 对命令'add' 的参数进约束, **`help()`** 对该命令提供说明

```
const titleOption = {
    description: 'title of note',
    demand: true, // 这个参数是否必须的
    alias: 't' // 别名 原本参数写法为 '--title', 现在只写为 '-t' 即可
}
const bodyOption = {
    description: 'body of note',
    demand: true, // 这个参数是否必须的
    alias: 'b'
}

const argv = yargs
    .command('add', 'add note', { // command 用于定义命令行的一些参数和用法
        title: titleOption,
        body: bodyOption
    })
    .help()
    .argv;
```

如果我们输入命令 **`node app add`**, 会得到下面提示
```
Options:
  --help       Show help                                               [boolean]
  --title, -t  title of note                                          [required]
  --body, -b   body of note                                           [required]

Missing required arguments: title, body // 提示title, body参数是必须的
```

## 使用 ramda

使用这个函数式库，对数据进行处理

比如移除某个note
```
let filteredNotes = R.reject(R.whereEq({title: title}, R.__))(notes);
```
这个库采用curry编程的方式，所以执行顺序一般从右到左

本应用使用到了下列操作符
  - **`R.reject`**: R.filter的反面
  - **`R.whereEq`**：类似SQL语句
  - **`R.__`**: 占位符
  - **`R.filter`**: 对集合进行过滤
  - **`R.contains`**: 是否包含某个元素
  - **`R.prop`**: 取出对象中的某个属性
  - **`R.equals`**: 判断2个对象是否相等
  - **`R.forEach`**： 对集合元素进行操作

## 使用 fs 模块

这个node应用，使用 **`fs`** 模块，对文件进行读写操作, 主要使用到了下面2个方法
  - **`writeFileSync()`**： 写入文件
  - **`readFileSync()`**： 读取文件
