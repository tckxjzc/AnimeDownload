let gulp = require('gulp');
let rename = require('gulp-rename');
let  colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

// let ts = require('gulp-typescript').createProject('tsconfig.json');
let ts = require('gulp-typescript');


gulp.task('dev',['all'], () => {
    gulp.watch([
        '!node_modules/**/*',
        './**/src/**/*.ts',
        './**/types/**/*.d.ts',
        './**/src/**/*.tsx',
        './index.ts'
    ], ({type, path}) => {
        if (type !== 'changed') {
            return
        }
        gulp.src(path)
            .pipe(ts.createProject('tsconfig.json')())
            .pipe(rename({
                extname: '.js'
            }))
            .pipe(gulp.dest(getFileParent(path)))
            .on('end', () => {
                console.log(path.blue + '---success' .green);
            });
    });
});
gulp.task('all', () => {
    gulp.src([
        '!node_modules/**/*',
        './**/src/**/*.ts',
        './**/types/**/*.d.ts',
        './**/src/**/*.tsx',
        './index.ts',
    ])
        .pipe(ts.createProject('tsconfig.json')())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest('./'));
});

function getFileParent(name) {
    let index = name.lastIndexOf('/');
    return name.substring(0, index);
}