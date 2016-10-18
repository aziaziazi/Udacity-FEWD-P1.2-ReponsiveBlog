/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    cwebp: {
      images: {
        options: {
          arguments: [ '-q', 40 ],
          concurrency: 20
        },
        files: [
          { src: [ 'images/*.jpg', 'images/*.png' ] }
        ]
      }
    },

    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          concurrency:7,
          upscale: true,
          sizes: [{
            width: 600,
            suffix:'',
            quality:50
          },{
            width: 800,
            suffix:'',
            quality:50
          },{
            width: 1200,
            suffix:'',
            quality:50
          },{
            width: 1600,
            suffix:'',
            quality:50
          }
          ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-webp-compress');

  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'cwebp']);

};
