'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _s = require('underscore.string');
var path = require('path');

var mkdirp = require('mkdirp').sync;
var util = require('util');
var spawnSync = require('child_process').spawnSync;

function doSpawnSync(mainCommand, optsArr){
    var result = spawnSync(mainCommand, optsArr);
    if(result.stderr.length){
        return '';
    }
    return result.stdout.toString().trim(); // 因为spawnSync返回的数据并不是字符串, 所以需要自己做转成字符的处理
}

module.exports = generators.Base.extend({
    constructor: function () {
        var testLocal;

        generators.Base.apply(this, arguments);

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });
    },

    _getFormattedDate: function(){
        var date = new Date();
        var arr = [];
        arr.push(date.getFullYear());
        arr.push(date.getMonth() + 1);
        arr.push(date.getDate());
        for(var i in arr){
            arr[i].length < 2 ? '0' + arr[i].toString() : arr[i].toString();
        };
        return arr.join('\/');
    },

    initializing: function () {
        var hasPkg = this.fs.exists(this.destinationPath('package.json'));
        var gitBranch;
        var gitVersion;
        var version;

        this.frameworkChoices = [
            {
                name: 'none',
                value: 'none',
                checked: true
            },
            {
                name: 'Vue.js',
                value: 'Vue',
                checked: false
            },
            {
                name: 'React.js',
                value: 'React',
                checked: false
            }
        ];
        this.testFrameworkChoices = [
            {
                name: 'none',
                value: 'none',
                checked: true
            },
            {
                name: 'mocha',
                value: 'mocha',
                checked: false
            },
            {
                name: 'ava',
                value: 'ava',
                checked: false
            }
        ];
        this.featuresChoices = [
            {
                name: 'Zepto.js',
                value: 'Zepto',
                checked: false
            },
            {
                name: 'autoprefixer',
                value: 'autoprefixer',
                checked: false
            }
        ];

        this.pkg = (hasPkg && this.fs.readJSON('package.json')) || {};

        this.name = this.pkg.name || _s.slugify(path.basename(process.cwd())) || '';
        this.description = this.pkg.description || '';

        /*
        * 首先看看是否已存在package.json文件,
        * 如果有, 则从该文件中取得version和author信息,
        * 如果没有, 则继续通过git命令获取当前所在的branch、user.name、user.email,
        * 从branch中看是否可以匹配出version, 通过user.name、user.email获得author name和author email
        * 如果从git中也没有找到所需的内容, 则只好置为空
        * */
        this.username  = doSpawnSync('git', ['config', 'user.name']) || '';
        this.email   = doSpawnSync('git', ['config', 'user.email']) || '';
        if(this.pkg.author && this.pkg.author.name) {
            this.authorName = this.pkg.author.name
        }else{
            this.authorName = (this.username) ? this.username : '';
        }
        if(this.pkg.author && this.pkg.author.email) {
            this.authorEmail = this.pkg.author.email
        }else{
            this.authorEmail = (this.email) ? this.email : '';
        }

        gitBranch = doSpawnSync('git',['rev-parse','--abbrev-ref', 'HEAD']); // 用git命令获取当前所在的branch
        if(gitBranch) {
            gitBranch = gitBranch.replace(/\r?\n|\r/g, '');
            gitVersion = gitBranch.match(/\d\.\d\.\d/);
            version = gitVersion ? gitVersion[1] : '';
        }
        this.version = this.pkg.version || version || '0.1.0';

        this.date = this._getFormattedDate();
    },

    prompting: function () {
        var prompts;
        var _this = this;

        this.log(yosay('Welcome to use ' + chalk.green('generator-acme') + '!\n Current version: ' + chalk.magenta(_this.version) ));

        prompts = [
            {
                type: 'input',
                message: 'project name:',
                name: 'name',
                default: this.name
            },
            {
                type: 'input',
                message: 'version:',
                name: 'version',
                default: this.version
            },
            {
                type: 'input',
                message: 'project description:',
                name: 'description',
                default: this.description
            },
            {
                type: 'input',
                name: 'repo',
                message: 'git repository:',
                default: ''
            },

            {
                type: 'input',
                message: 'license:',
                name: 'license',
                default: 'MIT'
            },
            {
                type: 'input',
                message: 'author name:',
                name: 'authorName',
                default: this.authorName
            },
            {
                type: 'input',
                message: 'email:',
                name: 'authorEmail',
                default: this.authorEmail
            },
            {
                type: 'list',
                message: 'which framework would you like to use?',
                name: 'framework',
                choices: this.frameworkChoices
            },
            {
                type: 'list',
                message: 'Which test framework do you want?',
                name: 'testFramework',
                choices: this.testFrameworkChoices
            },
            {
                type: 'checkbox',
                message: 'Which additional features would you like to include?',
                name: 'features',
                choices: this.featuresChoices
            }
        ];

        function hasFeature(feat) {
            var features = this;
            return features && features.indexOf(feat) !== -1;
        };

        return this.prompt(prompts).then(function (answers) {
            var features = answers.features;

            this.answers = {
                /*
                * 用underscore的.string.slugify()方法将当前所在目录名转换成符合package.json的name字段要求的字符串
                * 比如会将hello world转成hello-world
                * */
                name: answers.name,
                version: answers.version,
                description: answers.description,
                repo: answers.repo,
                license: answers.license,
                authorName: answers.authorName,
                authorEmail: answers.authorEmail,
                date: _this.date,
                framework: answers.framework,
                testFramework: answers.testFramework,
                needZepto: hasFeature('Zepto'),
                needAutoprefixer: hasFeature('autoprefixer')
            }
        }.bind(this));
    },

    writing: function() {
        var _this = this;

        var fileLists = {
            none: [
                ['_babelrc', '.babelrc'],
                ['_editorconfig', '.editorconfig'],
                ['_eslintignore', '.eslintignore'],
                ['_eslintrc.js', '.eslintrc.js'],
                ['_gitignore', '.gitignore'],
                ['_npmignore', '.npmignore'],
                ['jsdoc.conf.json', 'jsdoc.conf.json'],
                ['package.json', 'package.json'],
                ['README.md', 'README.md'],
                ['src/main.js', 'src/main.js'],
                ['.config/', '.config/'],
                ['test/', 'test/']
            ],
            vue: [
                ['_babelrc', '.babelrc'],
                ['_editorconfig', '.editorconfig'],
                ['_eslintignore', '.eslintignore'],
                ['_eslintrc.js', '.eslintrc.js'],
                ['_gitignore', '.gitignore'],
                ['_npmignore', '.npmignore'],
                ['jsdoc.conf.json', 'jsdoc.conf.json'],
                ['package.json', 'package.json'],
                ['README.md', 'README.md'],
                ['src/main.js', 'src/main.js'],
                ['.config/', '.config/'],
                ['test/', 'test/']
            ],
            react: [
                ['_babelrc', '.babelrc'],
                ['_editorconfig', '.editorconfig'],
                ['_eslintignore', '.eslintignore'],
                ['_eslintrc.js', '.eslintrc.js'],
                ['_gitignore', '.gitignore'],
                ['_npmignore', '.npmignore'],
                ['jsdoc.conf.json', 'jsdoc.conf.json'],
                ['package.json', 'package.json'],
                ['README.md', 'README.md'],
                ['src/main.js', 'src/main.js'],
                ['.config/', '.config/'],
                ['test/', 'test/']
            ]
        };

        var framework = this.answers.framework;
        var fileList = fileLists[framework];
        this.log(framework, fileList);
        fileLists[framework].forEach(function(filePair){
            _this.fs.copyTpl(
                _this.templatePath(framework+ '/' + filePair[0]),
                _this.destinationPath(filePair[1]),
                _this.answers
            );
        });
    },

    install: function () {
        if(!this.options['skip-install']){
            this.spawnCommand('npm', ['i']);
        }else{
            process.exit(0);
        };

        // this.installDependencies({
        //     skipMessage: this.options['skip-install-message'],
        //     skipInstall: this.options['skip-install'],
        //     bower: false
        // });
    }
});