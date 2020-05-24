/**
 * Gulp Tasks
 *
 * @since Quimimpex 1.0
 */

/**
 * Load Plugins
 */
const { gulp, dest, src, series, watch, task } = require('gulp');
const uglify			= require('gulp-uglify');
const rename			= require('gulp-rename');
const sass				= require('gulp-sass');
const cssClean			= require('gulp-clean-css');
const gulpCopy 			= require('gulp-copy');
const del				= require('del');

/**
 * Asset
 */
let assetsSrc			= 'assets/src/';
let dist 				= 'assets/dist/';
let nodeSrc				= 'node_modules/';

/**
 * Asset sources
 */
let jsSrc				= assetsSrc +'js/';
let scssSrc				= assetsSrc +'scss/';
let imagesSrc			= assetsSrc +'images/';

/**
 * Asset dist
 */
let jsDist				= dist +'js/';
let cssDist				= dist +'css/';
let imagesDist			= dist +'images/';

/**
 * Node Modules
 */
let bootstrapSrc		= nodeSrc +'bootstrap/**/*';
let jquerySrc			= nodeSrc +'jquery/dist/**/*';
let select2				= nodeSrc +'select2/dist/**/*';
let select2_bootstrap	= nodeSrc +'select2-theme-bootstrap4/dist/**/*';
let hover				= nodeSrc +'hover.css/scss/**/*';
let fancybox			= nodeSrc +'fancybox-master/**/*';
let vendorsSrc			= [ bootstrapSrc, jquerySrc, select2, select2_bootstrap, hover, fancybox, ];
let vendorsDist			= dist +'vendor/';

/**
 * Copy required dependencies from node_modules/ to assets/dist/vendors/
 *
 * @since Cubalite 1.0
 */
function vendors(){
	return src(vendorsSrc)
		.pipe(gulpCopy(vendorsDist, { prefix: 1 }));
}

/**
 * Delete assets/dist/css/ and assets/dist/js/ directories
 *
 * @since Cubalite 1.0
 */
function clean(){
	return del([cssDist, jsDist, imagesDist, vendorsDist]);
}

/**
 * Compile javascript files from assets/src/js/ to assets/dist/js/
 *
 * @since Cubalite 1.0
 */
function js(){
	return src(jsSrc + '*.js')
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(dest(jsDist));
}

/**
 * Compile scss files from assets/src/scss/ to assets/dist/css/
 *
 * @since Cubalite 1.0
 */
function scss(){
	return src(scssSrc + '*.scss')
		.pipe(sass())
		.pipe(cssClean())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest(cssDist));
}

/**
 * Copy assets/src/images/ directory to assets/dist/images/
 *
 * @since Cubalite 1.0
 */
function images(){
	return src(imagesSrc + '*.*')
		.pipe(dest(imagesDist));
}

exports.default = series( clean, vendors, js, scss, images );

/**
 * Watch files for changes
 * Run 'gulp watch' to deploy file changes
 *
 * @since Cubalite 1.0
 */
task('watch', () => {
	watch(jsSrc + '*.js', series( js ));
	watch(scssSrc +'*.scss', series( scss ));
	watch(imagesSrc +'*.*', series( images ));
})
