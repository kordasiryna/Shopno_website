var gulp = require('gulp'),					// Підключаемо Gulp
				less = require('gulp-less'),			// Підключаемо Less пакет
				browserSync = require('browser-sync'),	// Підключаємо Browser Sync
				concat = require('gulp-concat'),		// Підключаємо gulp-concat (для конкатенації файлів)
				uglify = require('gulp-uglifyjs'),		// Підключаємо gulp-uglifyjs (для стиснення JS)
				cssnano = require('gulp-cssnano'),		// Підключаємо пакет для мініфікації CSS
				rename = require('gulp-rename');		// Підключаємо бібліотеку для зміни імен файлів
				del = require('del'); // Підключаемо бібліотеку для видалення файлів і папок
				imagemin = require('gulp-imagemin'), // Підключаемо бібліотеку для роботи з зображеннями
				pngquant = require('imagemin-pngquant'); // Підключаемо бібліотеку для роботи з png
				cache = require('gulp-cache'); // Підключаємо бібліотеку кешування
				autoprefixer = require('gulp-autoprefixer'); // Підключаємо бібліотеку для автоматичного додавання префіксів
				

		gulp.task('scripts', function() {
				return gulp.src([													// Беремо всі необхідні бібліотеки у вигляді масиву
						'app/libs/jquery/dist/jquery.min.js',						// Беремо jQuery
						'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'	// Беремо Magnific Popup
					])
					.pipe(concat('libs.min.js'))									// Збираємо їх до купи у новому файлі libs.min.js
					.pipe(uglify())													// Стискаємо JS файл
					.pipe(gulp.dest('app/js'));										// Вивантажуємо в папку app/js
			});

		gulp.task('css-libs', ['less'], function() {
				return gulp.src('app/css/libs.css')		// Вибираємо файл для мініфікації
					.pipe(cssnano())					// Стискаємо
					.pipe(rename({suffix: '.min'}))		// Додаємо суфікс .min
					.pipe(gulp.dest('app/css'));		// Вивантажуємо в папку app/css
			});

		gulp.task('less', function() {						// Створюємо таск "less"
			return gulp.src('app/less/**/*.less')			// Беремо всі less файли з папки less і дочірніх, якщо є
				.pipe(less())								// Перетворюємо Less в CSS за допомогою gulp-less
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Створюємо префікси
				.pipe(gulp.dest('app/css'))					// Вивантажуємо результат в папку app/css
				.pipe(browserSync.reload({stream: true}))	// Оновлюємо CSS на сторінці при зміні
		});

		gulp.task('browser-sync', function() {	// Створюємо таск browser-sync
			browserSync({						// Виконуємо browser Sync
				server: {						// Визначаємо параметри сервера
					baseDir: 'app'				// Директорія для сервера - app
				},
				notify: false					// Відключаємо повідомлення зовнішнього ресурсу
			});
		});

		gulp.task('clean', function() {
			return del.sync('dist');					// Видаляємо папку dist перед збіркою
		});
		gulp.task('clear', function() {
			return cache.clearAll(); // Будемо прописувати виключно вручну при необхідності очистки кешу
		});

		gulp.task('img', function() {
			return gulp.src('app/img/**/*') // Беремо всі зображения з app
				.pipe(cache(imagemin({		// Стискаємо їх з найкращими налаштуваннями з врахуванням кешування
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
				})))
				.pipe(gulp.dest('dist/img')); // Вивантажуємо на продакшен
		});


		gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
			gulp.watch('app/less/**/*.less', ['less']);			// Нагляд за less файлами у папці less
			gulp.watch('app/*.html', browserSync.reload);		// Нагляд за HTML файлами у корені проекта
			gulp.watch('app/js/**/*.js', browserSync.reload);	// Нагляд за JS файлами у папці js
		});
	
		


		gulp.task('build', ['clean', 'img', 'less', 'scripts'], function() {

			var buildCss = gulp.src([					// Переносимо CSS стилі в продакшен
				'app/css/main.css',
				'app/css/libs.min.css'
				])
			.pipe(gulp.dest('dist/css'))

			var buildFonts = gulp.src('app/fonts/**/*')	// Переносимо шрифти в продакшен
			.pipe(gulp.dest('dist/fonts'))

			var buildJs = gulp.src('app/js/**/*')		// Переносимо скріпти в продакшен
			.pipe(gulp.dest('dist/js'))

			var buildHtml = gulp.src('app/*.html')		// Переносимо HTML в продакшен
			.pipe(gulp.dest('dist'));

		});

		gulp.task('default', ['watch']);