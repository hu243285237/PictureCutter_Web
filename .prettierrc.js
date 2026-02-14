/** @type {import("prettier").Config} */
export default {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Number.POSITIVE_INFINITY,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf',
    // 加入插件
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    // 自定义导入排序规则
    importOrder: [
        '<BUILTIN_MODULES>',
        '^react$',
        '<THIRD_PARTY_MODULES>',
        '^src',
        '^\\.\\.',
        '^\\.(?!.*\\.scss$)',
        '',
        'scss$',
        '^resource'
    ],
    // 针对特定类型文件的配置
    overrides: [
        {
            files: ['**/*.ejs', '**/*.html', '**/*.jsx', '**/*.tsx', '**/*.sass', '**/*.scss'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['**/*.yml', '**/*.yaml'],
            options: {
                tabWidth: 2,
                singleQuote: false
            }
        }
    ]
};
