module.exports = function(grunt) {

    var path = require('path');

    // load the package JSON file
    var pkg = grunt.file.readJSON('package.json');

    // get the project paths
    var sourceDir = '../src/',
        projectDir = sourceDir + pkg.name + '/';

    // get the release paths
    var releaseDir = 'release/',
        releaseFilesDir = releaseDir + 'files/';

    grunt.initConfig({
        pkg: pkg,
        clean: {
            files: [
                releaseFilesDir + '**/*.*'
            ]
        },
        copy: {
            bacon: {
                files: [
                    {
                        expand: true,
                        cwd: projectDir + 'obj/Release/',
                        src: [
                            pkg.name + '.dll',
                            pkg.name + '.xml'
                        ],
                        dest: releaseFilesDir + 'bin/'
                    }
                ]
            }
        },
        zip: {
            release: {
                cwd: releaseFilesDir,
                src: [
                    releaseFilesDir + '**/*.*'
                ],
                dest: releaseDir + 'zip/' + pkg.name + '.' + pkg.version + '.zip'
            }
        },
        umbracoPackage: {
            dist: {
                src: releaseFilesDir,
                dest: releaseDir + 'umbraco/',
                options: {
                    name: pkg.name,
                    version: pkg.version,
                    url: pkg.url,
                    license: pkg.licenses[0].type,
                    licenseUrl: pkg.licenses[0].url,
                    author: pkg.author.name,
                    authorUrl: pkg.author.url,
                    readme: pkg.readme,
                    outputName: pkg.name + '.' + pkg.version + '.zip'
                }
            }
        },
        nugetpack: {
            dist: {
                src: projectDir + pkg.name + '.csproj',
                dest: releaseDir + 'nuget/',
                options: {
                    version: pkg.version,
                    properties: 'Platform=AnyCPU;Configuration=Release'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-umbraco-package');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nuget');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('dev', ['copy', 'zip', 'umbracoPackage', 'nugetpack']);

    grunt.registerTask('default', ['dev']);

};