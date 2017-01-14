(function () {
    "use strict";
    var path = require('path'),
        fs = require('fs-extra'),
        os = require('os'),
        LIVERELOAD_PORT = 35728;
    // 获取本机IP地址
    var localIp = (function () {
        var ip = '127.0.0.1';
        var ifaces = os.networkInterfaces();
        // 获取本地IP地址,起服务器时使用ip地址
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                if (iface.address.indexOf('10.') >= 0) {
                    ip = iface.address;
                }
            });
        });
        return ip;
    })();
    module.exports = function (grunt) {
        // 加载所有grunt模块
        require('load-grunt-tasks')(grunt);
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            // jade
            jade: {
                debug: {

                    options: {
                        pretty: true,
                        data: {
                            debug: false,
                            timestamp: "<%= grunt.template.today() %>"
                        }
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'src/',
                            src: ['**/*.jade'],
                            dest: 'src/',
                            ext: '.html'
                        }
                    ]
                }
            },
            // js验证
            jshint: {
                ignore_warning: {
                    options: {
                        '-W014': true
                    }
                },
                options: {
                    reporter: (function () {
                        try {
                            return require('jshint-stylish');
                        } catch (e) {
                            return null;
                        }
                    })(), //自定义输出style
                    predef: ['G', 'require', 'module', 'exports', 'g_config', 'goldlog', 'TB', 'unescape', '__dirname'],
                    force: true, //不中止task
                    strict: true,
                    sub: true, // 消除类似 ['hasTown'] is better written in dot notation
                    browser: true,
                    devel: true, //关闭开发模式，即可以使用`console`、`alert`等的调试函数
                    smarttabs: true, // 允许tab空格混写
//                    asi: true, // 可以不写分号
                    undef: true,
                    newcap: false,
                    expr: true, // 允许使用三元表达式
                    laxcomma: true, // 允许逗号前置的编码风格
                    multistr: true, // 允许多行的string
                    globals: {
                        KISSY: true
                    }
                },
                all: ['Gruntfile.js', 'src/script/**/*.js']
            },
            // 对build目录进行清理
            clean: {
                build: {
                    src: 'build/*'
                }
            },
            // css压缩
            cssmin: {
                all: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/style',
                            src: '**/*.css',
                            dest: 'build/style',
                            ext: '.css'
                        }
                    ]
                }

            },
            // js压缩
            uglify: {
				options: {
					beautify: {
						ascii_only: true
					},
					preserveComments: false
				},
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/script',
                            src: '**/*.js',
                            dest: 'build/script'
                        }
                    ]
                }
            },

            // myless 组件，自动上传图片到tbcdn
            myless: {
                main: {
                    options: {
                        compress: false
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'src/style/',
                            src: ['**/*.less'],
                            dest: 'src/style/',
                            ext: '.css'
                        }
                    ]
                }
            },
            // 监控文件变化
            watch: {
                css: {
                    files: ['src/**/*.less'],
                    tasks: ['newer:myless']
                },
                js: {
                    files: ['src/**/*.js'],
                    tasks: ['newer:jshint']
                },
                html: {
                    files: ['src/**/*.jade'],
                    tasks: ['newer:jade']
                },
                livereload: {
                    options: {
                        livereload: LIVERELOAD_PORT
                    },
                    files: ['src/**/*.html', 'src/**/*.css', 'src/**/*.less', 'src/**/*.js']
                }
            },
            // 启动本地服务
            connect: {
                options: {
                    port: 9000,
                    hostname: localIp,
                    keepalive: true,
                    open: true,
                    livereload: LIVERELOAD_PORT
                },
                server: {
                    options: {
                        open: true, //自动打开网页 http://
                        base: [
                            'src'  //主目录
                        ]
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/',
                            src: [
                                'image/*',
                                'fonts/*'
                            ],
                            dest: 'build/',
                            filter: 'isFile'
                        },
						{
							expand: true,
							cwd: 'src/',
							src: [
								'script/My97DatePicker/**/*',
								'script/jquery.fix.clone.js'
							],
							dest: 'build/'
						}
                    ]
                }
            }
        });

        // 默认被执行的任务列表。
        grunt.registerTask('build', ['clean', 'jade', 'myless', 'cssmin', 'uglify','copy']);
        grunt.registerTask('dev', ['build', 'connect', 'watch']);
    };
})();
