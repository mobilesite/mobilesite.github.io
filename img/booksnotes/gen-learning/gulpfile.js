var gulp = require('gulp');
var path = require('path');
var excludeGitignore = require('gulp-exclude-gitignore');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');

gulp
    .pipe(plumber())
    .pipe(eslint())
    .pipe(nsp());