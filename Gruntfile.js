module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: {
          'app/index.html': 'jade/default.jade'
        }
      },
      dist: {
        files: {
          'dist/index.html': 'jade/default.jade'
        }
      }
    },
    sass: {
      compile: {
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
          'dist/css/main.css': 'app/css/main.css'
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
      css: {
        src: ['components/css/normalize.css','components/css/main.css','temp/style.css'],
        dest: 'app/css/main.css'
      },
      js: {
        src: ['components/jquery/jquery.js','components/console.js','temp/coffee.js'],
        dest: 'app/js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/main.js': 'app/js/main.js'
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
      },
      dist: {
        options: {
          port: 9001,
          base: 'dist',
          keepalive: true
        }
      }
    },
    watch: {
      jade: {
        files: 'jade/default.jade',
        tasks: ['jade:dev'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: 'sass/style.sass',
        tasks: ['sass','concat:css'],
        options: {
          livereload: true
        }
      },
      coffee: {
        files: ['coffee/main.coffee'],
        tasks: ['coffee','concat:js']
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
  grunt.registerTask('dev',['jade:dev','sass','concat:css','coffee','concat:js','connect:dev','watch']);
  grunt.registerTask('dist',['jade:dist','sass','concat:css','cssmin','coffee','concat:js','uglify:dist']);
  grunt.registerTask('preview',['connect:dist']);
};