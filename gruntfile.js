module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowercopy: {
            options: {
                clean: true
            },
            copy: {
                options: {
                    destPrefix: "scripts/frameworks",
                    srcPrefix: "scripts/frameworks/bower_components"
                },
                files: {
                    "angular.js": "angular/angular.js",
                    "angular-resource.js": "angular-resource/angular-resource.js",
                    "angular-route.js": "angular-route/angular-route.js"
                }
            }
        },

        includeSource: {
            options: {
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            target: {
                files: {
                    "index.html": "index.html"
                }
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: "scripts/frameworks/bower_components",
                    layout: "byType",
                    cleanTargetDir: true,
                    cleanBowerDir: true
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['scripts/code/*.js'],
                // the location of the resulting JS file
                dest: 'scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.registerTask("default", ["bower:install", "bowercopy", "includeSource"]);
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-bowercopy");
    grunt.loadNpmTasks("grunt-include-source");
};