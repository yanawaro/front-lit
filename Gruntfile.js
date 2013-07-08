module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'app/index.html': 'jade/default.jade'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'temp/style.css': 'sass/style.sass'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/css/main.css': ['components/css/normalize.css','components/css/main.css','temp/style.css']
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'temp/coffee.js': 'coffee/main.coffee'
        }
      }
    },
    concat: {
      js: {
        src: ['components/jquery/jquery.js','components/console.js','temp/coffee.js'],
        dest: 'temp/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'app/js/main.js': ['temp/main.js']
        }
      }
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: 'app',
          keepalive: false
        }
      }
    },
    watch: {
      jade: {
        files: 'jade/default.jade',
        tasks: ['jade'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: 'sass/style.sass',
        tasks: ['sass','cssmin'],
        options: {
          livereload: true
        }
      },
      coffee: {
        files: ['coffee/main.coffee'],
        tasks: ['coffee','concat:js','uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('dev',['jade','sass','cssmin','coffee','concat:js','uglify','connect:dev','watch']);
};